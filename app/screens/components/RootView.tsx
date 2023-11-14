// RootView.js
import React, { ReactNode, useEffect } from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Alert, StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface RootViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  isLoading: boolean;
  apiError: string | null;
  children: ReactNode;
}

const RootView: React.FC<RootViewProps> = ({ isLoading, apiError, children, containerStyle }) => {
  
  const navigation = useNavigation(); 
  useEffect(() => {
    console.log("api error is here "+apiError);
    if (apiError) {
      Alert.alert('Error', apiError, [{ text: 'OK', onPress: () => {
        if(navigation.canGoBack()){
          navigation.goBack();
        }
      } }]);
    }
  }, [apiError]);

  return (
    <View style={[containerStyle]}>
      {children}
     
      {isLoading ? (
        <Modal transparent animationType="slide" visible={isLoading}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default RootView;