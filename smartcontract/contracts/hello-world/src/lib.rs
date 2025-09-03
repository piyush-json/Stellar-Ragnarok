#![no_std]

use soroban_sdk::{
    contractimpl, symbol, Address, Env, Symbol, 
    token::Client as TokenClient,
};

#[derive(Clone)]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    /// Initialize escrow with client, freelancer, platform, amount, and token contract ID
    pub fn initialize(
        env: Env,
        client: Address,
        freelancer: Address,
        platform: Address,
        amount: i128,
        token_contract: Address,
    ) -> Symbol {
        env.storage().set(symbol!("client"), &client);
        env.storage().set(symbol!("freelancer"), &freelancer);
        env.storage().set(symbol!("platform"), &platform);
        env.storage().set(symbol!("amount"), &amount);
        env.storage().set(symbol!("token_contract"), &token_contract);
        env.storage().set(symbol!("state"), &symbol!("AwaitingDeposit"));
        symbol!("Initialized")
    }

    /// Deposit funds into escrow (must be called by client)
    pub fn deposit(env: Env, from: Address) -> Symbol {
        let state: Symbol = env.storage().get(symbol!("state")).unwrap().unwrap();
        let client: Address = env.storage().get(symbol!("client")).unwrap().unwrap();
        let amount: i128 = env.storage().get(symbol!("amount")).unwrap().unwrap();
        let token_contract: Address = env.storage().get(symbol!("token_contract")).unwrap().unwrap();

        if state != symbol!("AwaitingDeposit") {
            panic!("Not awaiting deposit");
        }
        if from != client {
            panic!("Deposit must be made by client");
        }

        let token_client = TokenClient::new(&env, &token_contract);

        // Transfer tokens from client wallet to this contract's address
        token_client.transfer(&from, &env.current_contract_address(), &amount);

        env.storage().set(symbol!("state"), &symbol!("AwaitingDelivery"));
        symbol!("DepositReceived")
    }

    /// Client confirms delivery; contract releases payment minus 5% platform fee
    pub fn confirm_delivery(env: Env, from: Address) -> Symbol {
        let state: Symbol = env.storage().get(symbol!("state")).unwrap().unwrap();
        let client: Address = env.storage().get(symbol!("client")).unwrap().unwrap();
        let freelancer: Address = env.storage().get(symbol!("freelancer")).unwrap().unwrap();
        let platform: Address = env.storage().get(symbol!("platform")).unwrap().unwrap();
        let amount: i128 = env.storage().get(symbol!("amount")).unwrap().unwrap();
        let token_contract: Address = env.storage().get(symbol!("token_contract")).unwrap().unwrap();

        if state != symbol!("AwaitingDelivery") {
            panic!("Not awaiting delivery");
        }
        if from != client {
            panic!("Delivery confirmation must be from client");
        }

        let platform_fee = amount * 5 / 100;
        let payout = amount - platform_fee;

        let token_client = TokenClient::new(&env, &token_contract);

        // Transfer platform fee to platform
        token_client.transfer(&env.current_contract_address(), &platform, &platform_fee);
        // Transfer remaining payout to freelancer
        token_client.transfer(&env.current_contract_address(), &freelancer, &payout);

        env.storage().set(symbol!("state"), &symbol!("Complete"));
        symbol!("DeliveryConfirmed")
    }

    /// Get current escrow state
    pub fn get_state(env: Env) -> Symbol {
        env.storage().get(symbol!("state")).unwrap().unwrap()
    }
}
 