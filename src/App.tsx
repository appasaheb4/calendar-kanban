import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
import {Header} from './core-components';
import LinearGradient from 'react-native-linear-gradient';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

import {
  formatDateToKey,
  getDateToString,
  getServiceData,
} from './core-utils/utilities';
import {Event} from './models/event.model';

function App(): React.JSX.Element {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateTitle, setDateTitle] = useState(new Date().toDateString());
  const [eventsList, setEventList] = useState(
    getServiceData(getDateToString(new Date())),
  );

  const handleSwipe = (direction: 'left' | 'right') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'left') {
        newDate.setDate(prevDate.getDate() + 1); // Go to the next day
      } else {
        newDate.setDate(prevDate.getDate() - 1); // Go to the previous day
      }
      setDateTitle(newDate.toDateString());
      setEventList(getServiceData(getDateToString(newDate)));
      return newDate;
    });
  };

  const SWIPE_THRESHOLD = SCREEN_WIDTH / 3; // Adjust the threshold as needed
  let swipeHandled = false; // Flag to ensure only one swipe is processed

  const swipeGesture = Gesture.Pan()
    .onUpdate(event => {
      if (!swipeHandled) {
        if (event.translationX > SWIPE_THRESHOLD) {
          handleSwipe('right'); // Swipe right
          swipeHandled = true; // Mark swipe as handled
        } else if (event.translationX < -SWIPE_THRESHOLD) {
          handleSwipe('left'); // Swipe left
          swipeHandled = true; // Mark swipe as handled
        }
      }
    })
    .onEnd(() => {
      swipeHandled = false; // Reset the flag when the gesture ends
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <LinearGradient
        colors={['#f6f8ff', '#efe6ff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <Header
          currentDate={currentDate}
          onSelectDate={date => {
            setDateTitle(date);
            setEventList(getServiceData(formatDateToKey(date)));
          }}
        />

        <View style={styles.mainView}>
          <Text style={styles.dayTitle}>{dateTitle}</Text>
          {eventsList?.map((item: Event, index: number) => (
            <View style={styles.card} key={index}>
              <LinearGradient
                colors={['#4f46e5', '#7c3aed']} // Diagonal gradient colors
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[styles.cardTime]}>
                <Text style={{color: 'white'}}>{item.time}</Text>
              </LinearGradient>
              <Image
                source={{
                  uri: item.imageUrl,
                }}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    padding: 20,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  cardTime: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 160,
    zIndex: -1,
  },
  cardContent: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default App;
