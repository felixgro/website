export const disableScrolling = () => {
   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
   window.onscroll = () => {
      window.scrollTo(scrollLeft, scrollTop);
   };
};

export const enableScrolling = () => {
   window.onscroll = () => { };
}