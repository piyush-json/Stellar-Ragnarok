import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Helper functions for common operations
export const auth = {
  // Sign up with email and password
  signUp: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  }
}

// Database operations
export const db = {
  // Profiles
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Gigs
  getGigs: async (filters = {}) => {
    let query = supabase
      .from('gigs')
      .select(`
        *,
        profiles!gigs_freelancer_id_fkey (
          id,
          username,
          avatar_url,
          rating_average,
          total_projects
        )
      `)
      .eq('status', 'active')

    if (filters.category) {
      query = query.eq('category', filters.category)
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice)
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    return { data, error }
  },

  createGig: async (gigData) => {
    const { data, error } = await supabase
      .from('gigs')
      .insert(gigData)
      .select()
      .single()
    return { data, error }
  },

  // Chats
  getChats: async (userId) => {
    const { data, error } = await supabase
      .from('chats')
      .select(`
        *,
        gigs!chats_gig_id_fkey (
          id,
          title,
          category
        ),
        profiles!chats_freelancer_id_fkey (
          id,
          username,
          avatar_url
        ),
        profiles!chats_client_id_fkey (
          id,
          username,
          avatar_url
        )
      `)
      .or(`freelancer_id.eq.${userId},client_id.eq.${userId}`)
      .order('last_message_at', { ascending: false })
    return { data, error }
  },

  sendMessage: async (chatId, message) => {
    const { data, error } = await supabase
      .from('chats')
      .update({
        messages: supabase.sql`messages || ${JSON.stringify([message])}`,
        last_message_at: new Date().toISOString()
      })
      .eq('id', chatId)
      .select()
      .single()
    return { data, error }
  },

  // Applications
  createApplication: async (applicationData) => {
    const { data, error } = await supabase
      .from('applications')
      .insert(applicationData)
      .select()
      .single()
    return { data, error }
  },

  getApplications: async (gigId) => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        profiles!applications_freelancer_id_fkey (
          id,
          username,
          avatar_url,
          rating_average,
          total_projects
        )
      `)
      .eq('gig_id', gigId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Ratings
  createRating: async (ratingData) => {
    const { data, error } = await supabase
      .from('ratings')
      .insert(ratingData)
      .select()
      .single()
    return { data, error }
  },

  getRatings: async (userId) => {
    const { data, error } = await supabase
      .from('ratings')
      .select(`
        *,
        profiles!ratings_client_id_fkey (
          id,
          username,
          avatar_url
        ),
        gigs!ratings_gig_id_fkey (
          id,
          title
        )
      `)
      .eq('freelancer_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  }
}

// Real-time subscriptions
export const realtime = {
  // Subscribe to chat messages
  subscribeToChat: (chatId, callback) => {
    return supabase
      .channel(`chat:${chatId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'chats',
        filter: `id=eq.${chatId}`
      }, callback)
      .subscribe()
  },

  // Subscribe to new gigs
  subscribeToNewGigs: (callback) => {
    return supabase
      .channel('new_gigs')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'gigs'
      }, callback)
      .subscribe()
  },

  // Subscribe to application updates
  subscribeToApplications: (gigId, callback) => {
    return supabase
      .channel(`applications:${gigId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'applications',
        filter: `gig_id=eq.${gigId}`
      }, callback)
      .subscribe()
  }
}

// Storage operations
export const storage = {
  uploadFile: async (bucket, path, file) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)
    return { data, error }
  },

  getFileUrl: (bucket, path) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    return data.publicUrl
  },

  deleteFile: async (bucket, path) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path])
    return { data, error }
  }
}

export default supabase




