import { supabase } from '../config/supabaseClient.js';

export const registerUser = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
                emailRedirectTo: "",
                email_confirm: false
            }
        });

        if (error) {
            if (error.code === 'weak_password' || error.message.includes('at least 6 characters')) {
                return res.status(400).json({ error: 'Password must be at least 6 characters' });
            }
            if (error.message.includes('already been registered') || error.message.includes('already registered')) {
                return res.status(409).json({ error: 'Email already exists' });
            }
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({
            id: data.user.id,
            username: data.user.user_metadata.username,
            email: data.user.email
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.log('Login error:', error);
            if (error.message.includes('Invalid login') || error.message.includes('invalid')) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            return res.status(401).json({ error: error.message });
        }

        res.json({
            id: data.user.id,
            account_details: [{
                username: data.user.user_metadata.username,
                email: data.user.email
            }]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};