-- StarLance Database Schema
-- Freelance Chat Application Database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('freelancer', 'client');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');

-- 1. Profile Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    wallet_address TEXT UNIQUE NOT NULL,
    bio TEXT,
    role user_role NOT NULL,
    avatar_url TEXT,
    skills TEXT[],
    hourly_rate DECIMAL(10,2),
    total_earnings DECIMAL(15,2) DEFAULT 0,
    rating_average DECIMAL(3,2) DEFAULT 0,
    total_projects INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Gigs/Listing Table
CREATE TABLE gigs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    freelancer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    price DECIMAL(10,2) NOT NULL,
    delivery_time INTEGER NOT NULL, -- in days
    tags TEXT[],
    requirements TEXT[],
    attachments TEXT[], -- URLs to uploaded files
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Chats Table
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    freelancer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    gig_id UUID REFERENCES gigs(id) ON DELETE SET NULL,
    messages JSONB DEFAULT '[]'::jsonb,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique chat between freelancer and client for a specific gig
    UNIQUE(freelancer_id, client_id, gig_id)
);

-- 4. Transactions Table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    amount_xlm DECIMAL(15,6) NOT NULL, -- Stellar Lumens amount
    transaction_hash TEXT UNIQUE NOT NULL,
    status transaction_status DEFAULT 'pending',
    escrow_release_date TIMESTAMP WITH TIME ZONE,
    client_approval BOOLEAN DEFAULT false,
    freelancer_approval BOOLEAN DEFAULT false,
    dispute_raised BOOLEAN DEFAULT false,
    dispute_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Ratings Table
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    gig_id UUID REFERENCES gigs(id) ON DELETE SET NULL,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
    review TEXT,
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
    value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
    is_anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one rating per client-freelancer-gig combination
    UNIQUE(client_id, freelancer_id, gig_id)
);

-- 6. Applications Table (Additional table for job applications)
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
    freelancer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    proposal TEXT NOT NULL,
    proposed_price DECIMAL(10,2),
    delivery_time INTEGER, -- in days
    attachments TEXT[],
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one application per freelancer per gig
    UNIQUE(gig_id, freelancer_id)
);

-- 7. Disputes Table (Additional table for handling disputes)
CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    raised_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    evidence TEXT[],
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'resolved', 'closed')),
    admin_notes TEXT,
    resolution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_wallet ON profiles(wallet_address);
CREATE INDEX idx_profiles_role ON profiles(role);

CREATE INDEX idx_gigs_freelancer ON gigs(freelancer_id);
CREATE INDEX idx_gigs_category ON gigs(category);
CREATE INDEX idx_gigs_status ON gigs(status);
CREATE INDEX idx_gigs_price ON gigs(price);

CREATE INDEX idx_chats_freelancer ON chats(freelancer_id);
CREATE INDEX idx_chats_client ON chats(client_id);
CREATE INDEX idx_chats_gig ON chats(gig_id);
CREATE INDEX idx_chats_last_message ON chats(last_message_at);

CREATE INDEX idx_transactions_gig ON transactions(gig_id);
CREATE INDEX idx_transactions_client ON transactions(client_id);
CREATE INDEX idx_transactions_freelancer ON transactions(freelancer_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_hash ON transactions(transaction_hash);

CREATE INDEX idx_ratings_freelancer ON ratings(freelancer_id);
CREATE INDEX idx_ratings_client ON ratings(client_id);
CREATE INDEX idx_ratings_score ON ratings(score);

CREATE INDEX idx_applications_gig ON applications(gig_id);
CREATE INDEX idx_applications_freelancer ON applications(freelancer_id);
CREATE INDEX idx_applications_status ON applications(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gigs_updated_at BEFORE UPDATE ON gigs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON disputes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- Profiles RLS: Users can only read public profiles and edit their own
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Gigs RLS: Anyone can view gigs, only freelancers can create/edit their own
CREATE POLICY "Anyone can view gigs" ON gigs FOR SELECT USING (true);
CREATE POLICY "Freelancers can create gigs" ON gigs FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()::uuid AND role = 'freelancer')
);
CREATE POLICY "Freelancers can update own gigs" ON gigs FOR UPDATE USING (
    freelancer_id = auth.uid()::uuid
);

-- Chats RLS: Users can only access chats they're part of
CREATE POLICY "Users can view own chats" ON chats FOR SELECT USING (
    freelancer_id = auth.uid()::uuid OR client_id = auth.uid()::uuid
);
CREATE POLICY "Users can insert chats" ON chats FOR INSERT WITH CHECK (
    freelancer_id = auth.uid()::uuid OR client_id = auth.uid()::uuid
);
CREATE POLICY "Users can update own chats" ON chats FOR UPDATE USING (
    freelancer_id = auth.uid()::uuid OR client_id = auth.uid()::uuid
);

-- Transactions RLS: Users can only access transactions they're part of
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (
    client_id = auth.uid()::uuid OR freelancer_id = auth.uid()::uuid
);
CREATE POLICY "Users can insert transactions" ON transactions FOR INSERT WITH CHECK (
    client_id = auth.uid()::uuid
);

-- Ratings RLS: Users can view ratings, but only create ratings for completed work
CREATE POLICY "Anyone can view ratings" ON ratings FOR SELECT USING (true);
CREATE POLICY "Users can create ratings" ON ratings FOR INSERT WITH CHECK (
    client_id = auth.uid()::uuid
);

-- Applications RLS: Freelancers can manage their applications, clients can view applications for their gigs
CREATE POLICY "Users can view relevant applications" ON applications FOR SELECT USING (
    freelancer_id = auth.uid()::uuid OR 
    EXISTS (SELECT 1 FROM gigs WHERE gigs.id = applications.gig_id AND gigs.freelancer_id = auth.uid()::uuid)
);
CREATE POLICY "Freelancers can create applications" ON applications FOR INSERT WITH CHECK (
    freelancer_id = auth.uid()::uuid
);
CREATE POLICY "Freelancers can update own applications" ON applications FOR UPDATE USING (
    freelancer_id = auth.uid()::uuid
);

-- Disputes RLS: Users can only access disputes they're part of
CREATE POLICY "Users can view own disputes" ON disputes FOR SELECT USING (
    EXISTS (SELECT 1 FROM transactions WHERE transactions.id = disputes.transaction_id AND 
            (transactions.client_id = auth.uid()::uuid OR transactions.freelancer_id = auth.uid()::uuid))
);
CREATE POLICY "Users can create disputes" ON disputes FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM transactions WHERE transactions.id = disputes.transaction_id AND 
            (transactions.client_id = auth.uid()::uuid OR transactions.freelancer_id = auth.uid()::uuid))
);

-- Insert sample data for testing
INSERT INTO profiles (username, email, wallet_address, bio, role) VALUES
('john_doe', 'john@example.com', 'GABC123456789', 'Experienced web developer', 'freelancer'),
('jane_smith', 'jane@example.com', 'GDEF987654321', 'Looking for quality work', 'client'),
('mike_dev', 'mike@example.com', 'GHIJ456789123', 'Full-stack developer', 'freelancer');

-- Insert sample gigs
INSERT INTO gigs (freelancer_id, title, description, category, price, delivery_time) VALUES
((SELECT id FROM profiles WHERE username = 'john_doe'), 'Website Development', 'Professional website development', 'Web Development', 500.00, 7),
((SELECT id FROM profiles WHERE username = 'mike_dev'), 'Mobile App', 'iOS and Android app development', 'Mobile Development', 800.00, 14);

-- Insert sample chat
INSERT INTO chats (freelancer_id, client_id, gig_id) VALUES
((SELECT id FROM profiles WHERE username = 'john_doe'), (SELECT id FROM profiles WHERE username = 'jane_smith'), 
 (SELECT id FROM gigs WHERE title = 'Website Development'));

COMMENT ON TABLE profiles IS 'User profiles for freelancers and clients';
COMMENT ON TABLE gigs IS 'Job listings posted by freelancers';
COMMENT ON TABLE chats IS 'Chat conversations between freelancers and clients';
COMMENT ON TABLE transactions IS 'Payment transactions for completed work';
COMMENT ON TABLE ratings IS 'User ratings and reviews';
COMMENT ON TABLE applications IS 'Job applications from freelancers';
COMMENT ON TABLE disputes IS 'Dispute resolution system';
