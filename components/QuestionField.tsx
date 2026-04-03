import { Question } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function QuestionField({
  question,
}: {
  question: Question | null;
}) {
  if (!question) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No question today yet.</Text>
        <Text style={styles.emptySubText}>Check back soon.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={styles.accentDot} />
        <Text style={styles.label}>TODAYS QUESTION</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.questionText}>{question.Text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1612",
    borderRadius: 20,
    padding: 28,
    marginHorizontal: 16,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  accentDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#e8a838",
  },
  label: {
    color: "#e8a838",
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: "700",
    fontFamily: "Georgia",
  },
  divider: {
    height: 1,
    backgroundColor: "#2e2a24",
    marginBottom: 20,
  },
  questionText: {
    color: "#f5f0e8",
    fontSize: 22,
    lineHeight: 32,
    fontFamily: "Georgia",
    fontStyle: "italic",
    letterSpacing: 0.3,
  },

  // Empty state
  emptyContainer: {
    backgroundColor: "#1a1612",
    borderRadius: 20,
    padding: 28,
    marginHorizontal: 16,
    marginTop: 24,
    alignItems: "center",
    gap: 6,
  },
  emptyText: {
    color: "#f5f0e8",
    fontSize: 16,
    fontFamily: "Georgia",
    fontStyle: "italic",
  },
  emptySubText: {
    color: "#6b6355",
    fontSize: 13,
    letterSpacing: 1.5,
    fontFamily: "Georgia",
  },
});
