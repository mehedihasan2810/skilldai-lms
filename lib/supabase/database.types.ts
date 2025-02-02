export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string
          password: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name?: string
          password: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string
          password?: string
        }
        Relationships: []
      }
      chats: {
        Row: {
          created_at: string
          id: string
          title: string
          type: string
          user_id: string
          user_idd: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          type?: string
          user_id?: string
          user_idd?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          type?: string
          user_id?: string
          user_idd?: string | null
        }
        Relationships: []
      }
      course_quiz_options: {
        Row: {
          created_at: string
          id: string
          option: string
          quiz_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          option: string
          quiz_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          option?: string
          quiz_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_quiz_options_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "course_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      course_quizzes: {
        Row: {
          answer: string
          created_at: string
          id: string
          options: string[]
          question: string
          result: Json
          section_id: string
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          options: string[]
          question: string
          result?: Json
          section_id?: string
          user_id?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          options?: string[]
          question?: string
          result?: Json
          section_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_quizzes_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      course_sections: {
        Row: {
          completed_users: string[]
          content: string
          course_id: string
          created_at: string
          id: string
          quizzes_result: Json
          title: string
          user_id: string
        }
        Insert: {
          completed_users?: string[]
          content: string
          course_id?: string
          created_at?: string
          id?: string
          quizzes_result?: Json
          title: string
          user_id?: string
        }
        Update: {
          completed_users?: string[]
          content?: string
          course_id?: string
          created_at?: string
          id?: string
          quizzes_result?: Json
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_token_usage: {
        Row: {
          course_description: string
          course_title: string
          created_at: string
          id: number
          input_token: number
          output_token: number
          total_token: number
        }
        Insert: {
          course_description: string
          course_title: string
          created_at?: string
          id?: number
          input_token?: number
          output_token?: number
          total_token?: number
        }
        Update: {
          course_description?: string
          course_title?: string
          created_at?: string
          id?: number
          input_token?: number
          output_token?: number
          total_token?: number
        }
        Relationships: []
      }
      courses: {
        Row: {
          completed_users: string[]
          created_at: string
          description: string
          difficulty: string
          grade: string | null
          id: string
          in_progress_users: string[]
          input_token: number | null
          not_started_users: string[]
          output_token: number | null
          status: string
          target_audience: string
          title: string
          topic: string
          total_token: number | null
          user_email: string
          user_id: string
        }
        Insert: {
          completed_users?: string[]
          created_at?: string
          description: string
          difficulty?: string
          grade?: string | null
          id?: string
          in_progress_users?: string[]
          input_token?: number | null
          not_started_users?: string[]
          output_token?: number | null
          status?: string
          target_audience?: string
          title: string
          topic?: string
          total_token?: number | null
          user_email: string
          user_id?: string
        }
        Update: {
          completed_users?: string[]
          created_at?: string
          description?: string
          difficulty?: string
          grade?: string | null
          id?: string
          in_progress_users?: string[]
          input_token?: number | null
          not_started_users?: string[]
          output_token?: number | null
          status?: string
          target_audience?: string
          title?: string
          topic?: string
          total_token?: number | null
          user_email?: string
          user_id?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          feedback: string
          id: number
          sender_email: string
        }
        Insert: {
          created_at?: string
          feedback: string
          id?: number
          sender_email: string
        }
        Update: {
          created_at?: string
          feedback?: string
          id?: number
          sender_email?: string
        }
        Relationships: []
      }
      lesson_plan: {
        Row: {
          created_at: string
          duration: string | null
          focusing_on: string | null
          grade_level: string | null
          id: string
          plan: string
          previous_lesson_info: string | null
          style: string | null
          title: string
          topic: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration?: string | null
          focusing_on?: string | null
          grade_level?: string | null
          id?: string
          plan: string
          previous_lesson_info?: string | null
          style?: string | null
          title: string
          topic: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: string | null
          focusing_on?: string | null
          grade_level?: string | null
          id?: string
          plan?: string
          previous_lesson_info?: string | null
          style?: string | null
          title?: string
          topic?: string
          user_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachments: Json | null
          chat_id: string
          created_at: string
          id: number
          metadata: Json | null
          role: string
          text: string
          user_id: string
        }
        Insert: {
          attachments?: Json | null
          chat_id: string
          created_at?: string
          id?: number
          metadata?: Json | null
          role: string
          text: string
          user_id?: string
        }
        Update: {
          attachments?: Json | null
          chat_id?: string
          created_at?: string
          id?: number
          metadata?: Json | null
          role?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_chat: {
        Row: {
          created_at: string
          file_name: string
          file_url: string
          id: string
          summary: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_url: string
          id?: string
          summary: string
          title: string
          user_id?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_url?: string
          id?: string
          summary?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      pdf_chat_embeddings: {
        Row: {
          content: string | null
          embedding: string | null
          file_name: string | null
          file_url: string | null
          id: number
          pdf_chat_id: string | null
          tokens: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: number
          pdf_chat_id?: string | null
          tokens?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: number
          pdf_chat_id?: string | null
          tokens?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pdf_chat_embeddings_pdf_chat_id_fkey"
            columns: ["pdf_chat_id"]
            isOneToOne: false
            referencedRelation: "pdf_chat"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_chat_messages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          pdf_chat_id: string | null
          role: string | null
          sub_content: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          pdf_chat_id?: string | null
          role?: string | null
          sub_content?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          pdf_chat_id?: string | null
          role?: string | null
          sub_content?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "summarizer_messages_summarizer_id_fkey"
            columns: ["pdf_chat_id"]
            isOneToOne: false
            referencedRelation: "pdf_chat"
            referencedColumns: ["id"]
          },
        ]
      }
      pdf_chat_notes: {
        Row: {
          created_at: string
          id: string
          note: string
          pdf_chat_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          note: string
          pdf_chat_id: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          pdf_chat_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "pdf_chat_notes_pdf_chat_id_fkey"
            columns: ["pdf_chat_id"]
            isOneToOne: false
            referencedRelation: "pdf_chat"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      qfd_questions: {
        Row: {
          answer: string
          created_at: string
          id: string
          options: string[]
          question: string
          quiz_id: string | null
        }
        Insert: {
          answer: string
          created_at?: string
          id?: string
          options: string[]
          question: string
          quiz_id?: string | null
        }
        Update: {
          answer?: string
          created_at?: string
          id?: string
          options?: string[]
          question?: string
          quiz_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qfd_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "qfd_quiz"
            referencedColumns: ["id"]
          },
        ]
      }
      qfd_quiz: {
        Row: {
          correct_answers: string[]
          created_at: string
          file_name: string
          file_url: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          correct_answers: string[]
          created_at?: string
          file_name: string
          file_url: string
          id?: string
          title: string
          user_id?: string
        }
        Update: {
          correct_answers?: string[]
          created_at?: string
          file_name?: string
          file_url?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      token_usage: {
        Row: {
          created_at: string
          email: string | null
          id: string
          input_token: number
          llm: string
          model: string
          month: number | null
          output_token: number
          total_tokens: number | null
          type: string
          user_email: string | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          input_token?: number
          llm?: string
          model?: string
          month?: number | null
          output_token?: number
          total_tokens?: number | null
          type?: string
          user_email?: string | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          input_token?: number
          llm?: string
          model?: string
          month?: number | null
          output_token?: number
          total_tokens?: number | null
          type?: string
          user_email?: string | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: []
      }
      user_info: {
        Row: {
          class_name: string | null
          created_at: string
          id: string
          institution: string
          profession: string
          section: string | null
          subject: string | null
          user_id: string
        }
        Insert: {
          class_name?: string | null
          created_at?: string
          id?: string
          institution: string
          profession: string
          section?: string | null
          subject?: string | null
          user_id?: string
        }
        Update: {
          class_name?: string | null
          created_at?: string
          id?: string
          institution?: string
          profession?: string
          section?: string | null
          subject?: string | null
          user_id?: string
        }
        Relationships: []
      }
      worksheets: {
        Row: {
          created_at: string
          difficulty: string | null
          grade_level: string | null
          id: string
          num_of_questions: number | null
          title: string
          topic: string
          user_id: string
          worksheets: string
        }
        Insert: {
          created_at?: string
          difficulty?: string | null
          grade_level?: string | null
          id?: string
          num_of_questions?: number | null
          title: string
          topic: string
          user_id?: string
          worksheets: string
        }
        Update: {
          created_at?: string
          difficulty?: string | null
          grade_level?: string | null
          id?: string
          num_of_questions?: number | null
          title?: string
          topic?: string
          user_id?: string
          worksheets?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_document_content: {
        Args: {
          pdf_chat_id: string
          embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          content: string
          similarity: number
        }[]
      }
      match_documents: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: number
          content: string
          embedding: string
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
