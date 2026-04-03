import AnswerField from "@/components/AnswerField";
import QuestionField from "@/components/QuestionField";
import { supabase } from "@/lib/supabase";
import { Question } from "@/types";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";

export default function Index() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const today = new Date().toISOString().split("T")[0];
      const { data: q } = await supabase
        .from("questions")
        .select("*")
        .eq("Date", today)
        .single();

      setQuestion(q ?? null);
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <QuestionField question={question} />
      <AnswerField question={question} userId={userId} />
    </KeyboardAvoidingView>
  );
}
