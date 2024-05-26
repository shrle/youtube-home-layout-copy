const createToggle = (onFunc, offFunc) => {
  let funcSwitch = false;

  return (param) => {
    funcSwitch = !funcSwitch;

    if (funcSwitch) return onFunc(param);
    else return offFunc(param);
  };
};

/**
 *
 * @param {string} selector document.querySelectorAll(selector)
 * @param {string[]} classList class name array
 */
const addClassList = (selector, classList) => {
  document.querySelectorAll(selector).forEach((element) => {
    for (const c of classList) {
      element.classList.add(c);
    }
  });
};

/**
 *
 * @param {string} selector document.querySelectorAll(selector)
 * @param {string[]} classList class name array
 */
const removeClassList = (selector, classList) => {
  document.querySelectorAll(selector).forEach((element) => {
    for (const c of classList) {
      element.classList.remove(c);
    }
  });
};

const userIconButton = document.querySelector(".user-icon-button");
const userMenu = document.querySelector(".user-menu");
const miniMenu = document.querySelector(".mini-menu");
const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const videos = document.querySelector(".videos");
const background = document.querySelector(".background");

userIconButton.addEventListener("click", (event) => {
  if (userMenu.style.display === "flex") return;
  userMenu.style.display = "flex";
  document.body.addEventListener(
    "click",
    () => {
      userMenu.style.display = "none";
    },
    { once: true }
  );

  event.stopPropagation();
});

userMenu.addEventListener("click", (e) => {
  e.stopPropagation();
});

const menuToggle = createToggle(
  () => {
    console.log("menu on");
    //miniMenu.classList.add("mini-menu-switched");
    //miniMenu.classList.remove("mini-menu");

    sidebar.classList.add("mini");
    menu.classList.add("display-none");
    videos.classList.add("margin-left-0");
  },
  () => {
    console.log("menu off");
    //miniMenu.classList.remove("mini-menu-switched");
    //removeClassList(".mini-menu-switched ul li a", ["display-flex"]);
    //miniMenu.classList.add("mini-menu");

    sidebar.classList.remove("mini");
    menu.classList.remove("display-none");
    videos.classList.remove("margin-left-0");
  }
);

const middleScreenWidth = 1300;
let isSidebarForeground = false;
const slideSidebar = () => {
  if (isSidebarForeground) {
    console.log("isSidebarForeground === true");
    sidebar.classList.remove("slide-in");
    sidebar.classList.add("slide-out");
    background.classList.remove("fade-in");
    background.classList.add("fade-out");

    background.addEventListener(
      "animationend",
      (event) => {
        sidebar.classList.remove("foreground");
        sidebar.classList.remove("slide-out");
        background.classList.add("display-none");
        background.classList.remove("fade-out");
        background.classList.remove("display-block");
        isSidebarForeground = false;
      },
      { once: true }
    );
    return;
  }

  sidebar.classList.add("foreground");
  sidebar.classList.add("slide-in");
  background.classList.remove("display-none");
  background.classList.add("fade-in");
  background.classList.add("display-block");
  isSidebarForeground = true;
};
const menuClick = () => {
  if (window.innerWidth <= middleScreenWidth) {
    slideSidebar();
    return;
  }
  menuToggle();
};

document.querySelectorAll(".menu-button").forEach((element) => {
  element.addEventListener("click", menuClick);
});

background.addEventListener("click", slideSidebar);

document.querySelector(".show-search-button").addEventListener("click", () => {
  document.querySelector("header").classList.add("wide-search");
});
document
  .querySelector(".back-search-box button")
  .addEventListener("click", () => {
    document.querySelector("header").classList.remove("wide-search");
  });
document.querySelectorAll(".video-link-box").forEach((item) => {
  item.addEventListener("mousedown", () => {
    document.body.addEventListener(
      "mouseup",
      () => {
        item.classList.remove("video-link-box-mouseup");
        window.requestAnimationFrame(() => {
          item.classList.add("video-link-box-mouseup");
        });
        item.addEventListener("animationend", (event) => {
          item.classList.remove("video-link-box-mouseup");
        });
      },
      { once: true }
    );
  });
});
