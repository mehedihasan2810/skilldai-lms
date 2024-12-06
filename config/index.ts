import { MainNavItem, NavItem, SidebarNavItem } from "@/types/nav";

export interface CourseConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  chartsNav: SidebarNavItem[];
}

export const navItems: NavItem[] = [
  {
    title: "Courses",
    href: "/courses",
    icon: "book",
    label: "Courses",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "chartArea",
    label: "Reports",
  },

  {
    title: "Generate course",
    href: "/courses/create",
    icon: "plus",
    label: "Generate course",
  },
  {
    title: "Generate quiz",
    href: "/quiz-from-doc",
    icon: "plus",
    label: "Generate quiz",
  },
  // {
  //   title: "User",
  //   href: "/dashboard/user",
  //   icon: "user",
  //   label: "user",
  // },
  // {
  //   title: "Employee",
  //   href: "/dashboard/employee",
  //   icon: "employee",
  //   label: "employee",
  // },
  // {
  //   title: "Profile",
  //   href: "/dashboard/profile",
  //   icon: "profile",
  //   label: "profile",
  // },
  // {
  //   title: "Kanban",
  //   href: "/dashboard/kanban",
  //   icon: "kanban",
  //   label: "kanban",
  // },
  // {
  //   title: "Login",
  //   href: "/",
  //   icon: "login",
  //   label: "login",
  // },
];

export const exampleCourse = [
  {
    title: "Introduction to HTML: Building the Web",
    description:
      "This beginner-level course introduces developers to HTML (Hypertext Markup Language), the foundation of web development. Learn to create structured, semantic web pages using HTML elements, attributes, and best practices. By the end of this course, you'll have the skills to build basic web pages and understand the core concepts of HTML.",
    sections: [
      {
        title: "What is HTML?",
        slug: "What-is-HTML-xqIvRyIoJb",
        content:
          '# What is HTML?\n\nHTML stands for Hypertext Markup Language. It is the standard markup language used to create web pages and is the foundation of web content.\n\n## Key points:\n\n- HTML is not a programming language; it\'s a markup language\n- It uses tags to define the structure and content of web pages\n- HTML documents are rendered by web browsers\n- The current version is HTML5\n\n### Basic structure of an HTML document:\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My First Web Page</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>This is my first HTML page.</p>\n</body>\n</html>\n```\n\nIn the following sections, we\'ll explore each part of this structure in detail.',
        quizzes: [
          {
            question: "What does HTML stand for?",
            options: [
              "Hypertext Markup Language",
              "High-Level Text Management Language",
              "Hyper Transfer Markup Language",
              "Home Tool Markup Language",
            ],
            answer: "Hypertext Markup Language",
          },
          {
            question: "Is HTML a programming language?",
            options: ["Yes", "No"],
            answer: "No",
          },
          {
            question: "What is the current version of HTML?",
            options: ["HTML3", "HTML4", "HTML5", "HTML6"],
            answer: "HTML5",
          },
        ],
      },
      {
        title: "HTML Elements and Tags",
        slug: "HTML-Elements-and-Tags-DyVufcsbg5",
        content:
          '# HTML Elements and Tags\n\nHTML uses elements to structure content. These elements are defined by tags.\n\n## Anatomy of an HTML element:\n\n```html\n<tagname>Content goes here...</tagname>\n```\n\n- Opening tag: `<tagname>`\n- Content: The information between the tags\n- Closing tag: `</tagname>`\n\n## Common HTML elements:\n\n1. Headings: `<h1>` to `<h6>`\n2. Paragraphs: `<p>`\n3. Links: `<a>`\n4. Images: `<img>`\n5. Lists: `<ul>`, `<ol>`, `<li>`\n6. Div (container): `<div>`\n\n### Example:\n\n```html\n<h1>Welcome to My Website</h1>\n<p>This is a paragraph about my website.</p>\n<a href="https://www.example.com">Visit Example.com</a>\n<img src="image.jpg" alt="A descriptive text">\n<ul>\n    <li>First item</li>\n    <li>Second item</li>\n</ul>\n```\n\nRemember, some elements (like `<img>`) are self-closing and don\'t require a closing tag.',
        quizzes: [
          {
            question: "What is the correct HTML for creating a hyperlink?",
            options: [
              '<a href="https://www.example.com">Example</a>',
              "<link>https://www.example.com</link>",
              '<href="https://www.example.com">Example</href>',
              "<url>https://www.example.com</url>",
            ],
            answer: '<a href="https://www.example.com">Example</a>',
          },
          {
            question: "Which tag is used for the largest heading?",
            options: ["<heading>", "<h6>", "<head>", "<h1>"],
            answer: "<h1>",
          },
          {
            question: "Which of the following is a self-closing tag?",
            options: ["<p>", "<div>", "<img>", "<a>"],
            answer: "<img>",
          },
        ],
      },
      {
        title: "HTML Attributes",
        slug: "HTML-Attributes-AQTd96sliE",
        content:
          '# HTML Attributes\n\nAttributes provide additional information about HTML elements and are always specified in the start tag.\n\n## Syntax:\n\n```html\n<tagname attribute="value">Content</tagname>\n```\n\n## Common attributes:\n\n1. `class`: Specifies one or more class names for an element\n2. `id`: Specifies a unique id for an element\n3. `style`: Specifies an inline CSS style for an element\n4. `src`: Specifies the URL of the media file (used with `<img>`, `<audio>`, `<video>`, etc.)\n5. `href`: Specifies the URL of the page the link goes to (used with `<a>` and `<link>`)\n6. `alt`: Specifies an alternate text for an image (used with `<img>`)\n\n### Examples:\n\n```html\n<a href="https://www.example.com" id="main-link" class="external-link">Visit Example.com</a>\n\n<img src="image.jpg" alt="A beautiful landscape" style="width:100px;height:100px;">\n\n<p class="highlight">This is an important paragraph.</p>\n```\n\nAttributes enhance the functionality and semantics of HTML elements, making your web pages more accessible and easier to style and manipulate with CSS and JavaScript.',
        quizzes: [
          {
            question:
              "Which attribute is used to specify a unique id for an HTML element?",
            options: ["class", "unique", "id", "name"],
            answer: "id",
          },
          {
            question:
              "What is the purpose of the 'alt' attribute in an <img> tag?",
            options: [
              "To specify the image source",
              "To provide alternative text for the image",
              "To set the image size",
              "To add a border to the image",
            ],
            answer: "To provide alternative text for the image",
          },
          {
            question:
              "Which attribute is used to specify an inline CSS style for an element?",
            options: ["class", "css", "style", "design"],
            answer: "style",
          },
        ],
      },
      {
        title: "HTML Document Structure",
        slug: "HTML-Document-Structure-sS1qw4xPfX",
        content:
          '# HTML Document Structure\n\nEvery HTML document follows a basic structure that includes several key elements.\n\n## Basic HTML structure:\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document Title</title>\n</head>\n<body>\n    <!-- Your content goes here -->\n</body>\n</html>\n```\n\n### Breakdown of elements:\n\n1. `<!DOCTYPE html>`: Declares that this is an HTML5 document\n2. `<html>`: The root element of the HTML page\n3. `<head>`: Contains meta information about the document\n4. `<meta charset="UTF-8">`: Specifies the character encoding for the document\n5. `<meta name="viewport">`: Ensures proper rendering on mobile devices\n6. `<title>`: Specifies a title for the document\n7. `<body>`: Defines the document\'s body, which contains all the visible contents\n\n## Semantic Structure:\n\nHTML5 introduced semantic elements to better structure your content:\n\n```html\n<body>\n    <header>\n        <h1>Website Title</h1>\n        <nav>\n            <!-- Navigation menu -->\n        </nav>\n    </header>\n    \n    <main>\n        <article>\n            <h2>Article Title</h2>\n            <p>Article content...</p>\n        </article>\n        \n        <aside>\n            <!-- Sidebar content -->\n        </aside>\n    </main>\n    \n    <footer>\n        <!-- Footer content -->\n    </footer>\n</body>\n```\n\nUsing semantic elements helps search engines and assistive technologies understand the structure of your web page.',
        quizzes: [
          {
            question: "What does the <!DOCTYPE html> declaration do?",
            options: [
              "It defines the document type as HTML5",
              "It creates a new HTML document",
              "It specifies the language of the document",
              "It sets the character encoding",
            ],
            answer: "It defines the document type as HTML5",
          },
          {
            question:
              "Which tag is used to define the main content of the HTML document?",
            options: ["<content>", "<main>", "<body>", "<article>"],
            answer: "<body>",
          },
          {
            question: "What is the purpose of the <head> element?",
            options: [
              "To define the header of the website",
              "To contain meta information about the document",
              "To specify the main content of the page",
              "To create a navigation menu",
            ],
            answer: "To contain meta information about the document",
          },
        ],
      },
      {
        title: "HTML Forms and Input Elements",
        slug: "HTML-Forms-and-Input-Elements-uYLP1hUW84",
        content:
          '# HTML Forms and Input Elements\n\nForms are a crucial part of web development, allowing users to input data and interact with web applications.\n\n## Basic form structure:\n\n```html\n<form action="/submit-form" method="post">\n    <!-- Form elements go here -->\n    <input type="submit" value="Submit">\n</form>\n```\n\n## Common form elements:\n\n1. Text input:\n   ```html\n   <input type="text" name="username" placeholder="Enter your username">\n   ```\n\n2. Password input:\n   ```html\n   <input type="password" name="password" placeholder="Enter your password">\n   ```\n\n3. Radio buttons:\n   ```html\n   <input type="radio" name="gender" value="male"> Male\n   <input type="radio" name="gender" value="female"> Female\n   ```\n\n4. Checkboxes:\n   ```html\n   <input type="checkbox" name="interests" value="sports"> Sports\n   <input type="checkbox" name="interests" value="music"> Music\n   ```\n\n5. Dropdown list:\n   ```html\n   <select name="country">\n       <option value="usa">United States</option>\n       <option value="uk">United Kingdom</option>\n       <option value="ca">Canada</option>\n   </select>\n   ```\n\n6. Textarea:\n   ```html\n   <textarea name="message" rows="4" cols="50">Enter your message here...</textarea>\n   ```\n\n7. Submit button:\n   ```html\n   <input type="submit" value="Submit">\n   ```\n\n### Example of a complete form:\n\n```html\n<form action="/submit-form" method="post">\n    <label for="name">Name:</label>\n    <input type="text" id="name" name="name" required>\n\n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email" required>\n\n    <label for="message">Message:</label>\n    <textarea id="message" name="message" required></textarea>\n\n    <input type="submit" value="Send Message">\n</form>\n```\n\nRemember to use appropriate attributes like `required`, `placeholder`, and `pattern` to enhance form functionality and user experience.',
        quizzes: [
          {
            question:
              "Which attribute specifies where to send the form-data when a form is submitted?",
            options: ["method", "action", "submit", "destination"],
            answer: "action",
          },
          {
            question: "What type of input is used for passwords?",
            options: [
              '<input type="text">',
              '<input type="password">',
              '<input type="secret">',
              '<input type="hidden">',
            ],
            answer: '<input type="password">',
          },
          {
            question:
              "Which form element is used to create a multi-line text input?",
            options: [
              '<input type="text">',
              "<multiline>",
              "<textarea>",
              '<input type="multiline">',
            ],
            answer: "<textarea>",
          },
        ],
      },
    ],
  },
];

export const courseConfig: CourseConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    {
      title: "Blocks",
      href: "/blocks",
    },
    {
      title: "Charts",
      href: "/charts",
    },
    {
      title: "Themes",
      href: "/themes",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Colors",
      href: "/colors",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "components.json",
          href: "/docs/components-json",
          items: [],
        },
        {
          title: "Theming",
          href: "/docs/theming",
          items: [],
        },
        {
          title: "Dark mode",
          href: "/docs/dark-mode",
          items: [],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          label: "Updated",
          items: [],
        },
        {
          title: "Typography",
          href: "/docs/components/typography",
          items: [],
        },
        {
          title: "Open in v0",
          href: "/docs/v0",
          items: [],
          label: "New",
        },
        {
          title: "Figma",
          href: "/docs/figma",
          items: [],
        },
        {
          title: "Changelog",
          href: "/docs/changelog",
          items: [],
        },
      ],
    },
    {
      title: "Installation",
      items: [
        {
          title: "Next.js",
          href: "/docs/installation/next",
          items: [],
        },
        {
          title: "Vite",
          href: "/docs/installation/vite",
          items: [],
        },
        {
          title: "Remix",
          href: "/docs/installation/remix",
          items: [],
        },
        {
          title: "Astro",
          href: "/docs/installation/astro",
          items: [],
        },
        {
          title: "Laravel",
          href: "/docs/installation/laravel",
          items: [],
        },
        {
          title: "Gatsby",
          href: "/docs/installation/gatsby",
          items: [],
        },
        {
          title: "Manual",
          href: "/docs/installation/manual",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Accordion",
          href: "/docs/components/accordion",
          items: [],
        },
        {
          title: "Alert",
          href: "/docs/components/alert",
          items: [],
        },
        {
          title: "Alert Dialog",
          href: "/docs/components/alert-dialog",
          items: [],
        },
        {
          title: "Aspect Ratio",
          href: "/docs/components/aspect-ratio",
          items: [],
        },
        {
          title: "Avatar",
          href: "/docs/components/avatar",
          items: [],
        },
        {
          title: "Badge",
          href: "/docs/components/badge",
          items: [],
        },
        {
          title: "Breadcrumb",
          href: "/docs/components/breadcrumb",
          items: [],
        },
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
        },
        {
          title: "Calendar",
          href: "/docs/components/calendar",
          items: [],
        },
        {
          title: "Card",
          href: "/docs/components/card",
          items: [],
        },
        {
          title: "Carousel",
          href: "/docs/components/carousel",
          items: [],
        },
        {
          title: "Chart",
          href: "/docs/components/chart",
          items: [],
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox",
          items: [],
        },
        {
          title: "Collapsible",
          href: "/docs/components/collapsible",
          items: [],
        },
        {
          title: "Combobox",
          href: "/docs/components/combobox",
          items: [],
        },
        {
          title: "Command",
          href: "/docs/components/command",
          items: [],
        },
        {
          title: "Context Menu",
          href: "/docs/components/context-menu",
          items: [],
        },
        {
          title: "Data Table",
          href: "/docs/components/data-table",
          items: [],
        },
        {
          title: "Date Picker",
          href: "/docs/components/date-picker",
          items: [],
        },
        {
          title: "Dialog",
          href: "/docs/components/dialog",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
        },
        {
          title: "Dropdown Menu",
          href: "/docs/components/dropdown-menu",
          items: [],
        },
        {
          title: "Form",
          href: "/docs/components/form",
          items: [],
        },
        {
          title: "Hover Card",
          href: "/docs/components/hover-card",
          items: [],
        },
        {
          title: "Input",
          href: "/docs/components/input",
          items: [],
        },
        {
          title: "Input OTP",
          href: "/docs/components/input-otp",
          items: [],
        },
        {
          title: "Label",
          href: "/docs/components/label",
          items: [],
        },
        {
          title: "Menubar",
          href: "/docs/components/menubar",
          items: [],
        },
        {
          title: "Navigation Menu",
          href: "/docs/components/navigation-menu",
          items: [],
        },
        {
          title: "Pagination",
          href: "/docs/components/pagination",
          items: [],
        },
        {
          title: "Popover",
          href: "/docs/components/popover",
          items: [],
        },
        {
          title: "Progress",
          href: "/docs/components/progress",
          items: [],
        },
        {
          title: "Radio Group",
          href: "/docs/components/radio-group",
          items: [],
        },
        {
          title: "Resizable",
          href: "/docs/components/resizable",
          items: [],
        },
        {
          title: "Scroll Area",
          href: "/docs/components/scroll-area",
          items: [],
        },
        {
          title: "Select",
          href: "/docs/components/select",
          items: [],
        },
        {
          title: "Separator",
          href: "/docs/components/separator",
          items: [],
        },
        {
          title: "Sheet",
          href: "/docs/components/sheet",
          items: [],
        },
        {
          title: "Skeleton",
          href: "/docs/components/skeleton",
          items: [],
        },
        {
          title: "Slider",
          href: "/docs/components/slider",
          items: [],
        },
        {
          title: "Sonner",
          href: "/docs/components/sonner",
          items: [],
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
          items: [],
        },
        {
          title: "Table",
          href: "/docs/components/table",
          items: [],
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
        },
        {
          title: "Textarea",
          href: "/docs/components/textarea",
          items: [],
        },
        {
          title: "Toast",
          href: "/docs/components/toast",
          items: [],
        },
        {
          title: "Toggle",
          href: "/docs/components/toggle",
          items: [],
        },
        {
          title: "Toggle Group",
          href: "/docs/components/toggle-group",
          items: [],
        },
        {
          title: "Tooltip",
          href: "/docs/components/tooltip",
          items: [],
        },
      ],
    },
  ],
  chartsNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/charts",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/charts/installation",
          items: [],
        },
        {
          title: "Theming",
          href: "/docs/charts/theming",
          items: [],
        },
      ],
    },
    {
      title: "Charts",
      items: [
        {
          title: "Area Chart",
          href: "/docs/charts/area",
          items: [],
        },
        {
          title: "Bar Chart",
          href: "/docs/charts/bar",
          items: [],
        },
        {
          title: "Line Chart",
          href: "/docs/charts/line",
          items: [],
        },
        {
          title: "Pie Chart",
          href: "/docs/charts/pie",
          items: [],
        },
        {
          title: "Radar Chart",
          href: "/docs/charts/radar",
          items: [],
        },
        {
          title: "Radial Chart",
          href: "/docs/charts/radial",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Tooltip",
          href: "/docs/charts/tooltip",
          items: [],
        },
        {
          title: "Legend",
          href: "/docs/charts/legend",
          items: [],
        },
      ],
    },
  ],
};
