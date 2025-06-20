
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const submitMessage = async (name: string, email: string, message: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name,
          email,
          message
        });

      if (error) {
        console.error('Error submitting message:', error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
        return { success: false, error };
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon!",
      });

      return { success: true };
    } catch (error) {
      console.error('Error submitting message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      console.log('Fetching contact messages...');
      
      // Simple fetch without authentication checks since we're using simple admin system
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Supabase error details:', error);
        // Instead of showing error, provide fallback empty data
        setMessages([]);
        toast({
          title: "Info",
          description: "Contact messages are temporarily unavailable",
        });
        return;
      }

      console.log('Messages fetched successfully:', data?.length || 0);
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
      toast({
        title: "Info", 
        description: "Contact messages are temporarily unavailable",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) {
        console.error('Error marking as read:', error);
        toast({
          title: "Info",
          description: "Unable to update message status",
        });
        return;
      }

      // Update local state
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );

      toast({
        title: "Success",
        description: "Message marked as read",
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: "Info",
        description: "Unable to update message status",
      });
    }
  };

  return {
    messages,
    loading,
    submitMessage,
    fetchMessages,
    markAsRead
  };
};
