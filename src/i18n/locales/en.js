const en = {
  menu: {
    dashboard: 'Statistic',
    workers: 'Workers',
    allUsers: 'Users',
    users: 'Users',
    organizers: 'Organizers',
    event: 'Events',
    ticketpaskage: 'Tariffs',
    ticket: 'Tickets',
    activationkeys: 'Activation-keys',
    settings: 'Settings',
    eventDetail: 'Event details'
  },
  settingMenu: {
    language: 'Languages',
    category: 'Categories',
    subcategory: 'Subcategories',
    social: 'Social media'
  },
  home: {
    title: 'General report',
    category: 'Categories',
    subcategory: 'Subcategories',
    language: 'Languages',
    ticketpaskage: 'Packages'
  },
  header: {
    search: 'Search',
    logout: 'Log out',
    confirm: 'Are you sure you want to log out?'
  },
  story: {
    update: 'Updated',
    add: 'New information added',
    delete: 'Deleted'
  },
  language: {
    table: {
      name: 'Language name',
      slug: 'Short code',
      select: 'Default selection',
      data: 'Date'
    },
    dialog: {
      title: 'New language',
      edit: 'Edit language',
      name: 'Language name',
      slug: 'Language code',
      placeholder: 'Example: uz, ru, en',
      close: 'Cancel',
      save: 'Save',
      deletetitle: 'Are you sure you want to delete the language?',
      btnTitle: 'Yes, delete it',
      deletetitleText: 'The data will be permanently deleted and cannot be recovered'
    }
  },
  category: {
    table: {
      img: 'Images',
      name: 'Category Name',
      language: 'Translations',
      data: 'Date'
    },
    dialog: {
      title: 'New Category',
      edit: 'Edit Category',
      name: 'Category Name',
      slug: 'Category Code (slug)',
      img: 'Category Image',
      placeholder: 'Upload Category Image',
      close: 'Cancel',
      save: 'Save',
      deletetitle: 'Are you sure you want to delete the category?,btnTitle: Yes, delete',
      btnTitle: 'Yes, delete it',
      deletetitleText: 'The data will be permanently deleted and cannot be recovered.'
    }
  },
  social: {
    table: {
      icon: 'Icon image',
      name: 'Name',
      data: 'Date'
    },
    dialog: {
      title: 'Add a new social network',
      edit: 'Edit the social network',
      name: 'Social network name',
      icon: 'Social network icon image',
      placeholder: 'Upload the icon image for the social network',
      close: 'Cancel',
      save: 'Save',
      deletetitle: 'Are you sure you want to delete this social network?',
      btnTitle: 'Yes, delete it',
      deletetitleText: 'The information will be permanently deleted and cannot be restored'
    }
  },
  subcategory: {
    table: {
      img: 'Images',
      name: 'Subcategory Name',
      category: 'Category',
      notadd: 'Not added',
      language: 'Translations',
      data: 'Date'
    },
    dialog: {
      title: 'New Subcategory',
      edit: 'Edit Subcategory',
      name: 'Subcategory Name',
      slug: 'Subcategory Code (slug)',
      category: 'Select Category',
      notcategory: 'No Category Selected',
      img: 'Subcategory Image',
      placeholder: 'Upload Subcategory Image',
      close: 'Cancel',
      save: 'Save',
      deletetitle: 'Are you sure you want to delete?',
      btnTitle: 'Yes, delete',
      deletetitleText: 'The data will be permanently deleted'
    }
  },
  worker: {
    table: {
      name: 'Full Name',
      phone: 'Phone',
      login: 'Login',
      role: 'Role',
      data: 'Time',
      lastVisit: 'Last visit',
      checkedOrganizers: 'Checking Organizer',
      checkedEvent: 'Checking Event',
      messages: 'Quantity of chat',
    },
    dialog: {
      title: 'Add New Worker',
      edit: 'Edit Worker Details',
      name: "Worker's First Name",
      lname: "Worker's Last Name",
      category: 'Select Category',
      subcategory: 'Select Subcategory',
      phone: "Worker's Phone Number",
      role: "Select Worker's Role",
      login: "Worker's Login",
      password: "Worker's Password",
      close: 'Cancel',
      save: 'Save',
      deletetitle: 'Are you sure you want to delete this worker?',
      btnTitle: 'Yes, delete it',
      deletetitleText: 'The data will be permanently deleted and cannot be restored',
      password_min_length: 'Password must be at least 5 characters long'
    }
  },
  ticketPackage: {
    table: {
      title: 'Name',
      text: 'Text',
      quantity: 'Quantity',
      language: 'Translations',
      commissionRate: 'Percentage',
      data: 'Time'
    },
    dialog: {
      title: 'Add New Package',
      edit: 'Edit Package Information',
      name: 'Package Name',
      text: 'Package Text',
      quantity: 'Number of Tickets',
      commissionRate: 'Percentage',
      close: 'Cancel',
      save: 'Save',
      deletetitle: 'Are you sure you want to delete?',
      btnTitle: 'Yes, delete',
      deletetitleText: 'The information will be permanently deleted'
    }
  },
  event: {
    table: {
      title: 'Name',
      text: 'Text',
      duration: 'Duration',
      date: 'Start / End',
      time: 'Start time',
      category: 'Category',
      subcategory: 'Subcategory',
      organizator: 'Organizer',
      CreatedAt: 'Added Time',
      status: 'Status',
      statusPanding: 'Pending',
      statusAccess: 'Accepted',
      statusRefused: 'Rejected',
      check: 'Checking',
      canceled: "Canceled",
      completed: "Completed",
      upcoming: "Upcoming",
      ongoing: "Ongoing",
    },
    detailPage: {
      sum: 'sum',
      access: 'Accept',
      danger: 'Cancel',
      comment: 'Comment'
    },
    accessDialog: {
      accesstitle: 'Do you really accept?',
      btnTitle: 'Yes',
      close: 'Cancel'
    }
  }
}

export default en
