import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const SWIPE_THRESHOLD = SCREEN_WIDTH / 2;
  const swipeHandledRef = useRef(false);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    // Update the current date and state
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'left') {
        newDate.setDate(prevDate.getDate() + 1); // Go to the next day
      } else {
        newDate.setDate(prevDate.getDate() - 1); // Go to the previous day
      }
      console.log({date: newDate.toDateString()});
      setDateTitle(newDate.toDateString());
      setEventList(getServiceData(getDateToString(newDate)));
      return newDate;
    });
  }, []);

  const swipeGesture = Gesture.Pan()
    .onUpdate(event => {
      if (!swipeHandledRef.current) {
        // Check if the swipe exceeds the threshold
        if (event.translationX > SWIPE_THRESHOLD) {
          swipeHandledRef.current = true; // Mark swipe as handled
          handleSwipe('right'); // Swipe right
        } else if (event.translationX < -SWIPE_THRESHOLD) {
          swipeHandledRef.current = true; // Mark swipe as handled
          handleSwipe('left'); // Swipe left
        }
      }
    })
    .onEnd(() => {
      swipeHandledRef.current = false; // Reset the flag when the gesture ends
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
            <TouchableOpacity
              key={index}
              onPress={() => openModal(item)} // Open modal on card press
              style={styles.card}>
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
            </TouchableOpacity>
          ))}
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedEvent && (
                <>
                  <Image
                    source={{uri: selectedEvent.imageUrl}}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                  <Text style={styles.modalDescription}>
                    {selectedEvent.description}
                  </Text>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    bottom: 20,
    position: 'absolute',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
