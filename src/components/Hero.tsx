'use client';
import { heroVideo, smallHeroVideo } from '@/utils'; // 비디오 클립 가져오기
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

const Hero = () => {
    //  비디오 소스를 상태변수로 설정
    const [videoSrc, setVideoSrc] = useState<string | null>(null); // 초기값으로 smallHeroVideo 설정

    // GSAP 애니메이션을 위한 use Hook
    useGSAP(() => {
        // videoSrc가 존재하고 #hero 요소가 렌더링된 후에만 실행
        if (videoSrc) {
            // 타이틀 애니메이션
            gsap.to('#hero', {
                opacity: 1, // 보이기
                delay: 1.5, // 1.5초 후 애님 시작
            });
        }
    }, [videoSrc]);

    // ************************** 비디오 소스 업데이트를 위한 함수
    useEffect(() => {
        let timeoutId: any;

        // ********* 화면 너비에 따라서 비디오 소스 업데이트하는 함수
        // window 객체는 클라이언트에서만 사용할 수 있으므로 useEffect 내에서 실행함
        const updateVideoSrc = () => {
            if (window.innerWidth < 760) {
                setVideoSrc(smallHeroVideo);
            } else {
                setVideoSrc(heroVideo);
            }
        };

        // *********** 리사이징시 성능 최적화를 위한 함수
        const debouncedUpdate = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateVideoSrc, 200); // 200ms 지연
        };

        // 화면 너비에 따라 비디오소스 업데이트 최초 실행
        updateVideoSrc();

        // 창 크기 변경 시 이벤트 핸들러 추가
        window.addEventListener('resize', debouncedUpdate);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', debouncedUpdate);
            clearTimeout(timeoutId);
        };
    }, []); // videoSrc 의존성 배열: 컴포넌트 마운트/언마운트 시에만 실행

    // videoSrc가 설정될 때까지 비디오 렌더링하지 않음
    if (!videoSrc) {
        return (
            <div className='flex justify-center items-center nav-height w-full text-sm'>
                video Loading...
            </div>
        ); // 또는 로딩 스피너, 플레이스홀더 이미지
    }

    return (
        // 높이 nav-height : 100vh - 60px
        <section className='w-full nav-height bg-black relative'>
            {/* 높이를 6등분의 5로 설정 */}
            <div className='h-5/6 w-full flex-center flex-col'>
                {/* ----- 타이틀: 정중앙에 숨김 ----- */}
                <p id='hero' className='hero-title'>
                    iPhone 15 Pro
                </p>
                {/* ----- 비디오 영역 ----- */}
                <div className='md:w-10/12 w-9/12'>
                    <video
                        className='pointer-events-none' // 선택 못하게
                        autoPlay // 자동 플레이
                        muted // 소리제거
                        playsInline={true} // 비디오를 전체가 아닌 다른 요소와 함께 플레이되도록 함
                        key={videoSrc} // React가 비디오 소스 제어하기 위해(추가하는 것이 좋음!!)
                    >
                        <source src={videoSrc} type='video/mp4' />
                    </video>
                </div>
            </div>
            {/* ----- 구매 버튼 만들기 : 최초 숨김 ----- */}
            <div
                id='cta'
                className='flex flex-col items-center opacity-0 translate-y-20'
            >
                <a href='#highlights' className='btn'>
                    Buy
                </a>
                <p className='font-normal text-xl'>From $199/month or $999</p>
            </div>
        </section>
    );
};
export default Hero;
