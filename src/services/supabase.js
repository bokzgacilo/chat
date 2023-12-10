import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://pdasbpxdpzywcqmbjwue.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkYXNicHhkcHp5d2NxbWJqd3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0NjYyNDIsImV4cCI6MjAxNjA0MjI0Mn0.o-AZrp19gTMI5NfQY3IqYGNM1xm8axjMc8QxvsMvE_w')

export default supabase;