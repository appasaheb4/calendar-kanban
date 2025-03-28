import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Header} from './core-components';
import LinearGradient from 'react-native-linear-gradient';

import {
  formatDateToKey,
  getDateToString,
  getServiceData,
} from './core-utils/utilities';
import {Event} from './models/event.model';

function App(): React.JSX.Element {
  const [dateTitle, setDateTitle] = useState(new Date().toDateString());
  const [eventsList, setEventList] = useState(
    getServiceData(getDateToString(new Date())),
  );

  return (
    <LinearGradient
      colors={['#f6f8ff', '#efe6ff']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <Header
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
