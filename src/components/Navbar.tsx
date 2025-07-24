import { navLists } from '@/constants'; // 네비게이션 데이터
import { appleImg, bagImg, searchImg } from '@/utils';

const Navbar = () => {
    return (
        <header className='w-full py-5 px-5 sm:px-10 flex justify-between items-center h-[60px]'>
            {/* ------------------- screen-max-width: 최대 너비 설정 커스텀 클래스  */}
            <nav className='flex w-full screen-max-width'>
                {/* ----- 사이트 로그 ----- */}
                <img src={appleImg} alt='apple logo' width={14} height={18} />
                {/* ----- 네비게이션 메뉴 : max-sm:hidden 640 이하에서 숨김 ----- */}
                <div className='flex flex-1 justify-center max-sm:hidden gap-8'>
                    {navLists.map((nav, index) => (
                        <div
                            key={nav}
                            className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'
                        >
                            {nav}
                        </div>
                    ))}
                </div>
                {/* ----- 검색 및 카트 ----- */}
                <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
                    <img src={searchImg} alt='search' width={18} height={18} />
                    <img src={bagImg} alt='bag' width={18} height={18} />
                </div>
            </nav>
        </header>
    );
};
export default Navbar;
