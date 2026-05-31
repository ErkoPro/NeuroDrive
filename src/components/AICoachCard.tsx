import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles, Lightbulb, AlertCircle, Info } from 'lucide-react-native';
import { GlassCard } from './GlassCard';
import { colors } from '../theme/colors';
import { AICoachMessage } from '../types';
import { fontFamily, typography } from '../theme/typography';

interface AICoachCardProps {
  messages: AICoachMessage[];
}

function getIcon(priority: AICoachMessage['priority']) {
  switch (priority) {
    case 'warning':
      return AlertCircle;
    case 'tip':
      return Lightbulb;
    default:
      return Info;
  }
}

function AICoachCardComponent({ messages }: AICoachCardProps) {
  return (
    <GlassCard variant="gradient-border">
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Sparkles size={20} color={colors.accentCyan} strokeWidth={2} />
        </View>
        <Text style={styles.title}>AI Coach</Text>
      </View>
      {messages.map((msg, i) => {
        const Icon = getIcon(msg.priority);
        return (
          <View key={msg.id} style={[styles.message, i > 0 && styles.messageBorder]}>
            <Icon size={16} color={colors.accentCyan} strokeWidth={2} />
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        );
      })}
    </GlassCard>
  );
}

export const AICoachCard = memo(AICoachCardComponent);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.accentGlow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.h2.fontSize,
    fontFamily: fontFamily.bold,
  },
  message: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  messageBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  messageText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    fontFamily: fontFamily.regular,
    lineHeight: 20,
  },
});
