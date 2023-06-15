/*
First, the required React and React Native components are imported from the react, react-native modules. 
COLOURS and Items variables are also imported from the ../database/Database module.
Also, some icon components are imported from react-native-vector-icons module.
*/
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLOURS, Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//A functional component named Home is defined. The component takes the navigation parameter.
const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
//Using the useState hook, two state variables products and accessory are created. Initial values ​​are assigned as an empty array ([]).


  //get called on screen loads

  //Using the useEffect hook, the getDataFromDB function is called when the component is loaded and refocused. 
  //By adding navigation dependency, useEffect works only when navigation changes and listener is removed.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from DB

  //A function called getDataFromDB is defined. 
  //This function takes data from the Items array and creates two empty arrays productList and accessoryList. 
  //It then loops through the Items array and adds products by category to the corresponding list. 
  //Finally, state variables are updated using the setProducts and setAccessory functions.
  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == 'product') {
        productList.push(Items[index]);
      } else if (Items[index].category == 'accessory') {
        accessoryList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
  };

  //create an product reusable card

  //The ProductCard component starts with a TouchableOpacity component. 
  //This is a touch feedback component that allows the user to click the card. 
  //When the click event occurs, the navigation.navigate method is called to switch to the ProductInfo screen and 
  //the productID parameter and the ID of the selected product are transmitted.
  const ProductCard = ({data}) => {
    return (
      //The TouchableOpacity component is used with a style object and properties such as width (width) and vertical margin (marginVertical) are set.
      
      //A View component is used to show the contents of the card. This component is structured to include an image and texts.
        
      /*
        Content View's style properties are set: width (width), height (height),
        corner roundness (borderRadius), backgroundColor, position (position), 
        to align content horizontally and vertically (justifyContent, alignItems), bottom space (marginBottom) etc.
        */
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
        style={{
          width: '48%',
          marginVertical: 14,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          {data.isOff ? (
            //If there is a discount (isOff) on the card, a box is created using a View component showing the discount percentage. 
            //This box contains a text component that contains the discount percentage.
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={data.productImage}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
             //The card contains an image component. This component displays an image from data.productImage. 
            //The size of the image is resized by 80% (resizeMode).
          

            /*
        Using Text components, product name (data.productName), product category (data.category), 
        product availability (data.isAvailable) and product price (data.productPrice) are displayed.
        */
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.productName}
        </Text>
        {data.category === 'accessory' ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}>
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}>
                Unavailable
              </Text>
            </View>
          )
        ) : null}
        <Text>&#8377; {data.productPrice}</Text>
      </TouchableOpacity>
    );
  };

  //The component is finally returned in the TouchableOpacity component.

  //The View component creates the parent component and occupies the full screen size. The background color is set to COLOURS.white.

    //The StatusBar component sets the style and background color of the application status bar. 
    //The background color is set to COLOURS.white and the text color to dark-content.

    //The ScrollView component provides vertical scrolling. 
    //The showsVerticalScrollIndicator property controls the visibility of the vertical scroll bar.

    //The View component creates a container around the icons. flexDirection: The 'row' property aligns the contents horizontally.

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <TouchableOpacity>           
            <Entypo                    //The first TouchableOpacity component contains the "shopping-bag" icon. The style and appearance of the icon are specified.
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}      
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>      
            <MaterialCommunityIcons                    //The style and appearance of the icon are specified. It also redirects to the MyCart page when the icon is clicked. 
              name="cart"                             //The second TouchableOpacity component contains the "cart" icon.
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            Shopping &amp; Service
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            
            {'\n'}This shop offers both products and services
          
            
          </Text>
        </View>
        <View                         //This section constitutes the section where the products are listed.
          style={{
            padding: 16,
          }}>
          <View                   //The nested View components create a container with the title and number of products.
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View                      //The first nested View component contains the title and the product count. The style and appearance of the texts are specified.
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Products
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                41
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              See All
            </Text>
          </View>
          <View                      //The second nested View component is the container where the product cards are listed. 
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {products.map(data => {                       //Creates a ProductCard component for each product card by mapping the products array.
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
        <View
          style={{                    //This section constitutes the part where the accessories are listed.
            padding: 16,                
          }}>
          <View                         //Nested View components create a container containing the number of titles and accessories
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Accessories
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                78
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              See All
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {accessory.map(data => {
              return <ProductCard data={data} key={data.id} />;
              //The second nested View component is the container where the accessory cards are listed. 
              //Creates a ProductCard component for each accessory card by mapping the accessory array.
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
