const menuTree = [
  {
    title: "Home",
    link: "/home",
    children: [
      { title: "Acerca de nosotros", link: "/home/about" },
      { title: "Servicios", link: "/home/services" },
      { title: "Noticias", link: "/home/news" },
      { title: "Proyectos", link: "/home/projects" }
    ]
  },
  {
    title: "Perfil",
    link: "/profile",
    children: [
      { title: "Configuración", link: "/profile/settings" },
      { title: "Seguridad", link: "/profile/security" },
      { title: "Actividad", link: "/profile/activity" },
    ]
  },
  {
    title: "Ayuda",
    link: "/help",
    children: [
      { title: "Contactarnos", link: "/help/contact" },
      { title: "FAQ's", link: "/help/faq" },
    ]
  }
];

export { menuTree as default };