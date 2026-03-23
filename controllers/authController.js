import { supabase } from '../config/supabaseClient.js';

export const registerUser = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username },
                emailRedirectTo: "",
                email_confirm: false //for testing, please set to true once actually implemented
            }
        });

        if (error) return res.status(400).json({ error: error.message });

        res.json({ user: data.user, session: data.session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) return res.status(401).json({ error: error.message });

        res.json({ session: data.session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};