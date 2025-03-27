import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type HeaderProps = {
  onSelectDate: (date: string) => void;
};

export const Header: React.FC<HeaderProps> = ({onSelectDate}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const getWeekDates = () => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to Sunday
    return Array.from({length: 7}, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();
  return (
    <LinearGradient
      colors={['#3b82f6', '#8b5cf6']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.header}>
      <Text style={styles.headerText}>Your Schedule</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekContainer}>
        {weekDates.map((date, index) => {
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelectDate(date.toDateString());
                setSelectedDate(date);
              }}
              style={styles.dayContainer}>
              {isSelected ? (
                <LinearGradient
                  colors={['#4f46e5', '#7c3aed']} // Diagonal gradient colors
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={[styles.selectedDay]}>
                  <Text style={[styles.dayText, styles.selectedDayText]}>
                    {daysOfWeek[date.getDay()]}
                  </Text>
                  <Text style={[styles.dateText, styles.selectedDayText]}>
                    {date.getDate()}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.selectedDay}>
                  <Text style={[styles.dayText, styles.selectedDayText]}>
                    {daysOfWeek[date.getDay()]}
                  </Text>
                  <Text style={[styles.dateText, styles.selectedDayText]}>
                    {date.getDate()}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  weekContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  dayText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.7,
  },
  dateText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.7,
  },
  selectedDay: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedDayText: {
    fontWeight: 'bold',
    opacity: 1,
  },
});
