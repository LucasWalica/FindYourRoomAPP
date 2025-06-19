Extended Documentation: https://deepwiki.com/LucasWalica/FindYourRoomAPP
# 🏠 FindYourRoomAPP

**FindYourRoomAPP** is a full-featured platform designed to help **tenants** and **landlords** manage rentals, search for rooms, and connect with compatible roommates. It combines property management, a social network, and a compatibility-matching system.

## 🚀 Overview

This application simplifies the process of finding ideal roommates and managing rental properties efficiently. Beyond traditional rental features, it integrates a social component to help people connect based on shared interests and compatibility.

## 🛠️ Tech Stack

- **Frontend:** Angular, Tailwind CSS  
- **Backend:** Django, Daphne, Django Channels (WebSockets), Celery  
- **Database:** PostgreSQL  
- **Task Queue:** Redis  
- **Containers:** Docker  
- **Other:** WebSockets, real-time notifications

## 📦 Architecture

- **Microservice-based architecture** orchestrated with Docker
- **Real-time communication** using WebSockets (via Django Channels + Daphne)
- **Asynchronous task processing** with Celery + Redis
- **Modular frontend** built with Angular and styled using Tailwind CSS

## 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FindYourRoomAPP.git
   cd FindYourRoomAPP
