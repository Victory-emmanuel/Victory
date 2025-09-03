import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tables = {
  projects: {
    Row: {
      id: string;
      title: string;
      description: string | null;
      tech_stack: string[] | null;
      image_url: string | null;
      project_url: string | null;
      github_repo_url: string | null;
      created_at: string;
      tags: string[] | null;
      featured: boolean | null;
    };
    Insert: {
      id?: string;
      title: string;
      description?: string | null;
      tech_stack?: string[] | null;
      image_url?: string | null;
      project_url?: string | null;
      github_repo_url?: string | null;
      created_at?: string;
      tags?: string[] | null;
      featured?: boolean | null;
    };
    Update: {
      id?: string;
      title?: string;
      description?: string | null;
      tech_stack?: string[] | null;
      image_url?: string | null;
      project_url?: string | null;
      github_repo_url?: string | null;
      created_at?: string;
      tags?: string[] | null;
      featured?: boolean | null;
    };
  };
  contact_messages: {
    Row: {
      id: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      created_at: string;
      is_read: boolean;
    };
    Insert: {
      id?: string;
      name: string;
      email: string;
      subject: string;
      message: string;
      created_at?: string;
      is_read?: boolean;
    };
    Update: {
      id?: string;
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      created_at?: string;
      is_read?: boolean;
    };
  };
};
