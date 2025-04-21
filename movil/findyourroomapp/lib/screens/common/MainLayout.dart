import 'package:flutter/material.dart';

class MainLayout extends StatelessWidget {
  final Widget child;

  const MainLayout({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('MicroCRM'),
        backgroundColor: Colors.green[200],
      ),
      backgroundColor: Colors.green[100],
      drawer: Drawer(
        backgroundColor: Colors.green[200],
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(child: Text('Menú')),
            ListTile(
              title: Text('Inicio'),
              onTap: () => Navigator.pushReplacementNamed(context, '/'),
            ),
            ListTile(
              title: Text('Clientes'),
              onTap: () => Navigator.pushReplacementNamed(context, '/clients'),
            ),
            ListTile(
              title: Text('Inventario'),
              onTap:
                  () => Navigator.pushReplacementNamed(context, '/inventory'),
            ),
            ListTile(
              title: Text('Ventas'),
              onTap: () => Navigator.pushReplacementNamed(context, '/sales'),
            ),
            ListTile(
              title: Text('Recordatorios'),
              onTap:
                  () => Navigator.pushReplacementNamed(context, '/reminders'),
            ),
          ],
        ),
      ),
      body: child,
    );
  }
}
