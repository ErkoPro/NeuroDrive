import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { colors } from '../theme/colors';
import { AICoachMessage } from '../types';

interface AICoachCardProps {
  messages: AICoachMessage[];
}

function getPriorityColor(priority: AICoachMessage['priority']) {
  switch (priority) {
    case 'warning':
      return colors.warning;
    case 'tip':
      return colors.primary;
    default:
      return colors.accentLight;
  }
}

function getPriorityIcon(priority: AICoachMessage['priority']): keyof typeof Ionicons.glyphMap {
  switch (priority) {
    case 'warning':
      return 'alert-circle-outline';
    case 'tip':
      return 'bulb-outline';
    default:
      return 'information-circle-outline';
  }
}

export function AICoachCard({ messages }: AICoachCardProps) {
  return (
    <GlassCard accent={colors.primary}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="sparkles" size={22} color={colors.primary} />
        </View>
        <Text style={styles.title}>AI Coach</Text>
      </View>
      {messages.map((msg, i) => {
        const color = getPriorityColor(msg.priority);
        return (
          <View key={msg.id} style={[styles.message, i > 0 && styles.messageBorder]}>
            <Ionicons name={getPriorityIcon(msg.priority)} size={18} color={color} />
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        );
      })}
    </GlassCard>
  );
}

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
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  message: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  messageBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
  },
  messageText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
