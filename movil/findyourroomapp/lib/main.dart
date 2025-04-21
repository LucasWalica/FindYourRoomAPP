import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Find Your Room App"
      routes: {
        '/':(context) => LoginRegisterScreen(),
        '/home':(context)=>HomeScreen(),
        // update and create tenant profile dialogs
        '/profile':(context)=>ProfileScreen(),
        '/houses':(context) => HousesScreen(),
        //add and update, delete houses and rooms dialog
        '/ownerHouses':(context)=>OwnerHousesScreen(),
        '/inbox':(context)=> InboxScreen(),
        '/chat':(context)=>ChatScreen(),
        '/friendList':(context)=>FriendListScreen(),
        // need to add resetpassword and confirm reset password        
      },
    
    );
  }
}
