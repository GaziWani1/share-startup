export const UTILITIES = {
  flexBetween: 'flex justify-between items-center',
  text30ExtraBold: 'text-[30px] font-extrabold text-white',
  text30Bold: 'text-[30px] font-bold text-black',
  text30SemiBold: 'font-semibold text-[30px] text-black',
  text26SemiBold: 'font-semibold text-[26px] text-black',
  text24Black: 'text-[24px] font-black text-black',
  text20Medium: 'font-medium text-[20px] text-black',
  text16Medium: 'font-medium text-[16px] text-black',
  text14Normal: 'font-normal text-sm text-white-100/80',
  pinkContainer: '',
  tag: 'bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri',
  heading:
    'uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5',
  subHeading:
    'font-medium text-[20px] text-white max-w-2xl text-center break-words',
  sectionContainer: 'px-6 py-10 max-w-7xl mx-auto',
  cardGrid: 'grid md:grid-cols-3 sm:grid-cols-2 gap-5',
  cardGridSm: 'grid sm:grid-cols-2 gap-5',
  noResult: 'text-black-100 text-sm font-normal',

  // profile
  profileContainer:
    'w-full pb-10  pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10',
  profileCard:
    'w-80 px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-[#EE2B69] border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full',
  profileTitle:
    "w-11/12 bg-white border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 before:left-0 before:-skew-y-6 before:w-full before:h-[60px] before:bg-black before:-z-[1] before:rounded-[20px] shadow-100",
  profileImage: 'rounded-full object-cover border-[3px] border-black',

  // idea details
  divider: 'border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto',
  viewSkeleton: 'bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3',

  // navbar
  avatar:
    'p-0 focus-visible:ring-0 bg-none rounded-full drop-shadow-md !important',
  dropdownMenu:
    'w-56 border-[5px] border-black bg-white p-5 rounded-2xl !important',
  login:
    'border-[5px] py-4 border-black bg-white text-black relative shadow-100 font-work-sans font-medium hover:shadow-none transition-all duration-500 !important',

  // searchform
  searchForm:
    'max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5',
  searchInput:
    'flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none',
  searchBtn:
    'size-[50px] rounded-full bg-black flex justify-center items-center !important',

  // startupcard
  startupCard:
    'bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-[#EE2B69]-100',
  startupCardDate:
    'font-medium text-[16px] bg-[#EE2B69]-100 px-4 py-2 rounded-full group-hover:bg-white-100',
  startupCardDesc:
    'font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all',
  startupCardImg: 'w-full h-[164px] rounded-[10px] object-cover',
  startupCardBtn:
    'rounded-full bg-black-200 font-medium text-[16px] text-white px-5 py-3 !important',
  startupCardSkeleton: 'w-full h-96 rounded-[22px] bg-zinc-400',

  // startupform
  startupForm: 'max-w-2xl mx-auto bg-white my-10 space-y-8 px-6',
  startupFormLabel: 'font-bold text-[18px] text-black uppercase',
  startupFormInput:
    'border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important',
  startupFormTextarea:
    'border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300 !important',
  startupFormError: 'text-red-500 mt-2 ml-5',
  startupFormEditor:
    'mt-3 border-[3px] border-black text-[18px] text-black font-semibold placeholder:text-black-300 !important',
  startupFormBtn:
    'bg-[#EE2B69] border-[4px] border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px] !important',

  // view
  viewContainer: 'flex justify-end items-center mt-5 fixed bottom-3 right-3',
  viewText:
    'font-medium text-[16px] bg-[#EE2B69]-100 px-4 py-2 rounded-lg capitalize',

  categoryTag:
    'font-medium text-[16px] bg-[#EE2B69]-100 px-4 py-2 rounded-full',

  pattern:
    'bg-[linear-gradient(to_right,transparent_49.5%,rgba(251,232,67,0.2)_49.5%,rgba(251,232,67,0.6)_50.5%,transparent_50.5%)] bg-[length:5%_100%] bg-center bg-repeat-x',

  tagTri:
    "before:content-[''] before:absolute before:top-2 before:left-2 before:border-t-[10px] before:border-t-black before:border-r-[10px] before:border-r-transparent after:content-[''] after:absolute after:bottom-2 after:right-2 after:border-b-[10px] after:border-b-black after:border-l-[10px] after:border-l-transparent",

  // external lib tweak
  mdEditorToolbar: 'p-[10px] !important',
};
