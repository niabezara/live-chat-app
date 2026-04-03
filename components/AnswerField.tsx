import { supabase } from "@/lib/supabase";
import { Answer, Question } from "@/types";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  question: Question | null;
  userId: string | null;
};

export default function AnswerField({ question, userId }: Props) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [myAnswer, setMyAnswer] = useState<Answer | null>(null);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  console.log(answers);
  useEffect(() => {
    if (!question || !userId) {
      setLoading(false);
      return;
    }
    fetchAnswers(question.id, userId);
  }, [question, userId]);

  const fetchAnswers = async (questionId: number, uid: string) => {
    setLoading(true);

    const { data: allAnswers } = await supabase
      .from("answers")
      .select("*")
      .eq("question_id", questionId)
      .order("created_at", { ascending: false });

    if (allAnswers) {
      const mine = allAnswers.find((a) => a.user_id === uid) ?? null;
      setMyAnswer(mine);
      setAnswers(allAnswers.filter((a) => a.user_id !== uid));
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!draft.trim() || !question || !userId) return;

    setSubmitting(true);

    const { data, error } = await supabase
      .from("answers")
      .insert({
        question_id: question.id,
        user_id: userId,
        content: draft.trim(),
      })
      .select()
      .single();

    if (!error && data) {
      setMyAnswer(data);
      setDraft("");
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      {myAnswer ? (
        <View>
          <Text>Your answer</Text>
          <Text>{myAnswer.content}</Text>
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Write your answer..."
            value={draft}
            onChangeText={setDraft}
            multiline
            maxLength={300}
          />
          <TouchableOpacity onPress={handleSubmit} disabled={submitting}>
            <Text>{submitting ? "Posting..." : "Post Answer"}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text>
        {answers.length || myAnswer
          ? "What others said"
          : "No answers yet — be the first!"}
      </Text>

      <FlatList
        data={answers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}
