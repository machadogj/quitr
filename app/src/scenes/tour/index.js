import React, { PropTypes } from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  Button,
  Container,
  Title,
  Paragraph
} from  '../../components';

const Tour =  ({ navigation }) => (
  <Container splitBackground>
    <Title text="How it works.."/>
    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'space-between'}}>
      <Paragraph
        style={ {flex: 1} }
        text="Using ‘loss aversion’, studies suggest that losses are twice as powerful on the mind as gains. Think twice the next time you smoke."
      />

      <Image
        style={{flex:1, height: undefined, width: undefined}}
        source={require('../../../assets/images/onboarding-how-it-works.png')}
        resizeMode="contain"
      />
      
      <View style={{flex:0.3}}>
      </View>
      <Button
        onPress={ () => navigation.navigate('monthly') }
        text="Let's quit!"
      />
    </View>
  </Container>
);

Tour.propTypes = {
  navigation: PropTypes.object
};

export default Tour;