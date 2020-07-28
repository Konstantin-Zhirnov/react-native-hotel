import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { THEME } from '../theme'
import { Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBooked } from '../store/actions/post'


const AboutStack = createStackNavigator()
const AboutNavigator = () => {
    return (
        <AboutStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
                },
                headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
            }}>
            <AboutStack.Screen
                options={({ navigation }) => ({
                    headerTitle: 'О приложении',
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Toggle Drawer"
                                iconName="ios-menu"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </HeaderButtons>
                    ),
                })}
                name="About"
                component={AboutScreen}
            />
        </AboutStack.Navigator>
    )
}

const CreateStack = createStackNavigator()
const CreateNavigator = () => {
    return (
        <CreateStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
                },
                headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
            }}>
            <CreateStack.Screen
                options={({ navigation }) => ({
                    headerTitle: 'Добавить номер',
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Toggle Drawer"
                                iconName="ios-menu"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </HeaderButtons>
                    ),
                })}
                name="Create"
                component={CreateScreen}
            />
        </CreateStack.Navigator>
    )
}

const Stack = createStackNavigator()

const AppNavigation = () => {

    const dispatch = useDispatch()
    const [star, setStar] = useState()

    let flag

    const temp = useSelector(state => state.post.isClick)

    useEffect(() => { setStar(flag) }, [temp])

    const toggleHandler = (id) => {
        dispatch(toggleBooked(id))
        setStar(prev => !prev)
    }

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
                },
                headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
            }}>
            <Stack.Screen name="Main"
                component={MainScreen}
                options={({ navigation }) => ({
                    headerTitle: 'Отель «Loft Garden»',
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Take photo"
                                iconName="ios-create"
                                onPress={() => navigation.navigate('Create')}
                            />
                        </HeaderButtons>
                    ),
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Toggle Drawer"
                                iconName="ios-menu"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </HeaderButtons>
                    ),
                })}
            />
            <Stack.Screen
                options={({ route }) => {
                    flag = route.params.postBooked;
                    return ({
                        // headerTitle: `Пост от: ${new Date(route.params.postDate).toLocaleDateString()}`,
                        headerTitle: route.params.postTitle,
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title="Take star"
                                    // iconName={route.params.postBooked ? 'ios-star' : 'ios-star-outline'}
                                    iconName={star ? 'ios-star' : 'ios-star-outline'}
                                    onPress={() => toggleHandler(route.params.postId)}
                                />
                            </HeaderButtons>
                        ),
                    })
                }}
                name="Post"
                component={PostScreen}
            />
        </Stack.Navigator>
    )
}

const BookedStack = createStackNavigator()
const BookedNavigator = () => {

    const dispatch = useDispatch()
    const [star, setStar] = useState(true)

    const toggleHandler = (id) => {
        dispatch(toggleBooked(id))
        setStar(prev => !prev)
    }

    return (
        <BookedStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
                },
                headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
            }}>
            <BookedStack.Screen
                options={({ navigation }) => ({
                    headerTitle: 'Избранное',
                    headerLeft: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Toggle Drawer"
                                iconName="ios-menu"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </HeaderButtons>
                    ),
                })}
                name="Booked"
                component={BookedScreen} />
            <BookedStack.Screen
                options={({ route }) => ({
                    headerTitle: route.params.postTitle,
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item
                                title="Take photo"
                                // iconName={route.params.postBooked ? 'ios-star' : 'ios-star-outline'}
                                iconName={star ? 'ios-star' : 'ios-star-outline'}
                                onPress={() => toggleHandler(route.params.postId)}
                            />
                        </HeaderButtons>
                    ),
                })}
                name="Post"
                component={PostScreen}
            />
        </BookedStack.Navigator>
    )
}

const Tab = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator()

function BottomNavigator() {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: THEME.MAIN_COLOR }}
            shifting={true}
            tabBarOptions={{
                activeTintColor: THEME.MAIN_COLOR,
            }}
            screenOptions={({ route }) => ({
                tabBarLabel: route.name === 'All' ? "Все" : 'Избранное',

                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'All') {
                        iconName = "ios-albums";
                    } else if (route.name === 'Booked') {
                        iconName = 'ios-star';
                    }

                    return <Ionicons name={iconName} size={24} color={color} />;
                }
            })}>
            <Tab.Screen name="All" component={AppNavigation} />
            <Tab.Screen name="Booked" component={BookedNavigator} />
        </Tab.Navigator>
    );
}


const Drawer = createDrawerNavigator();

export function MainNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: THEME.MAIN_COLOR,
                    itemStyle: {
                        marginVertical: 5
                    },
                    labelStyle: {
                        fontFamily: 'open-bold',
                        fontSize: 18
                    }
                }}
            >
                <Drawer.Screen
                    options={{
                        drawerLabel: 'Главная',
                        // drawerIcon: () => <Ionicons name="ios-albums" size={24} />
                    }}
                    name="Post"
                    component={BottomNavigator}
                />
                <Drawer.Screen
                    options={{
                        drawerLabel: 'О приложении'
                    }}
                    name="About"
                    component={AboutNavigator}
                />
                <Drawer.Screen
                    options={{
                        drawerLabel: 'Добавить номер'
                    }}
                    name="Create"
                    component={CreateNavigator}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
