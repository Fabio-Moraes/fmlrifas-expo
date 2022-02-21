import React from 'react';
import { View } from 'react-native';

import { RegisterMenu } from '../../components/Modals/RegisterMenu';
import { ShoppingCart } from '../../components/Modals/ShoppingCart';
import { PaymentMenu } from '../../components/Modals/PaymentMenu';
import { HamburgerMenu } from '../../components/Modals/HamburgerMenu';
import { SliderImage } from '../../components/SliderImage';
import { LoginMenu } from '../../components/Modals/LoginMenu';
import { CustomHeader } from '../../components/CustomHeader';
import { Keyboard } from '../../components/Modals/Keyboard';
import { RenderList } from '../../components/RenderList';
import { SearchBar } from '../../components/SearchBar';
import { Alert } from '../../components/Modals/Alert';

import { styles } from './styles';

export default function Home() {
  function Header() {
    return (
      <View>
        <SliderImage />
        <SearchBar />
      </View>
    );
  };

  function Modals() {
    return (
      <>
        <Keyboard />
        <LoginMenu />
        <PaymentMenu />
        <ShoppingCart />
        <RegisterMenu />
        <HamburgerMenu />
        <Alert />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <RenderList />
      <CustomHeader />
      <Modals />
    </View >
  );
};