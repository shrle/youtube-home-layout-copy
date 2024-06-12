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

//const userIconButton = document.querySelector(".user-icon-button");
//const userMenu = document.querySelector(".user-menu");
const miniMenu = document.querySelector(".mini-menu");
const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");
const videos = document.querySelector(".videos");
const background = document.querySelector(".background");

const popupControll = () => {
  const showButtonClick = (event, btn) => {
    if (btn.classList.contains("show-popup")) {
      btn.classList.remove("show-popup");
      event.stopPropagation();
      return;
    }

    /*
     * 現在開こうとしているポップアップに対して親要素ではないポップアップを閉じる
     */
    document.querySelectorAll(".show-popup").forEach((element) => {
      if (!element.nextElementSibling.contains(btn)) {
        element.classList.remove("show-popup");
      }
    });

    btn.classList.add("show-popup");
    const rect = btn.getBoundingClientRect();
    const windowWidth = document.querySelector("html").clientWidth;
    const popup = btn.nextElementSibling;
    popup.style.top = `${rect.bottom}px`;
    popup.style.right = `${windowWidth - rect.right}px`;

    document.body.classList.add("no_scroll");
    document.body.addEventListener(
      "click",
      () => {
        btn.classList.remove("show-popup");
        document.body.classList.remove("no_scroll");
      },
      { once: true }
    );

    event.stopPropagation();
  };
  document.querySelectorAll(".popup-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      showButtonClick(event, btn);
    });
  });

  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", (e) => {
      popup.querySelectorAll(".show-popup").forEach((child) => {
        child.classList.remove("show-popup");
      });
      e.stopPropagation();
    });
  });
};
popupControll();

const menuToggle = createToggle(
  () => {
    sidebar.classList.add("mini");
    videos.classList.add("margin-left-0");
  },
  () => {
    sidebar.classList.remove("mini");
    videos.classList.remove("margin-left-0");
  }
);

const middleScreenWidth = 1300;
let isSidebarForeground = false;
const slideSidebar = () => {
  if (isSidebarForeground) {
    //menu.classList.remove("slide-in");
    menu.classList.add("slide-out");
    //background.classList.remove("fade-in");
    background.classList.add("fade-out");

    menu.addEventListener(
      "transitionend",
      (event) => {
        console.log("transitionend");
        menu.classList.remove("slide-in");
        menu.classList.remove("slide-out");
        background.classList.remove("fade-in");
        background.classList.remove("fade-out");
        isSidebarForeground = false;
      },
      { once: true }
    );
    return;
  }

  //sidebar.classList.add("foreground");
  menu.classList.add("slide-in");
  //background.classList.remove("display-none");
  background.classList.add("fade-in");
  //background.classList.add("display-block");
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

window.addEventListener("resize", () => {
  if (middleScreenWidth < window.innerWidth) {
    isSidebarForeground = false;
    menu.classList.remove("slide-in");
    background.classList.remove("fade-in");
  }
});

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
