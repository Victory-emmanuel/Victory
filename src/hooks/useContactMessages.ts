import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase';

type ContactMessage = Tables['contact_messages']['Row'];
type ContactMessageInsert = Tables['contact_messages']['Insert'];
type ContactMessageUpdate = Tables['contact_messages']['Update'];

// Hook for fetching contact messages
export function useReadContactMessages(options?: {
  filter?: string;
  enabled?: boolean;
}) {
  const { filter = '', enabled = true } = options || {};

  return useQuery({
    queryKey: ['contact_messages', filter],
    queryFn: async () => {
      let query = supabase.from('contact_messages').select('*');

      if (filter) {
        query = query.or(`name.ilike.%${filter}%,email.ilike.%${filter}%,subject.ilike.%${filter}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as ContactMessage[];
    },
    enabled,
  });
}

// Hook for fetching unread contact messages count
export function useUnreadContactMessagesCount() {
  return useQuery({
    queryKey: ['contact_messages_unread_count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);

      if (error) {
        throw error;
      }

      return count || 0;
    },
  });
}

// Hook for creating a contact message
export function useCreateContactMessage() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContactMessage = async (contactMessage: ContactMessageInsert) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert(contactMessage)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Invalidate and refetch contact messages
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
      queryClient.invalidateQueries({ queryKey: ['contact_messages_unread_count'] });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createContactMessage, isLoading, error };
}

// Hook for updating a contact message
export function useUpdateContactMessage() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateContactMessage = async (id: string, updates: ContactMessageUpdate) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Invalidate and refetch contact messages
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
      queryClient.invalidateQueries({ queryKey: ['contact_messages_unread_count'] });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateContactMessage, isLoading, error };
}

// Hook for deleting a contact message
export function useDeleteContactMessage() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteContactMessage = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Invalidate and refetch contact messages
      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
      queryClient.invalidateQueries({ queryKey: ['contact_messages_unread_count'] });

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteContactMessage, isLoading, error };
}

// Hook for marking a message as read/unread
export function useToggleMessageReadStatus() {
  const { updateContactMessage, isLoading, error } = useUpdateContactMessage();

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    return updateContactMessage(id, { is_read: !currentStatus });
  };

  return { toggleReadStatus, isLoading, error };
}
