'use client';
import { rightImg, watchImg } from '@/utils';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import VideoCarousel from './VideoCarousel';

const Highlights = () => {
    useGSAP(() => {
        // 섹션 타이틀 애니메이션
        gsap.to('#title', {
            opacity: 1, // 보이기
            y: 0, // 원래위치로 이동
        });
        // 콘트롤 영역 애니메이션
        gsap.to('.link', {
            opacity: 1, // 보이기
            y: 0, // 원래위치로 이동
            duration: 1,
            stagger: 0.25, // 0.25초 간격으로 애님 실행
        });
    }, []);

    return (
        <section
            id='highlights' // 화면 전체 너비 & 높이, 커스텀 패딩 설정 클래스, zinc 배경색
            className='w-screen overflow-hidden h-full common-padding bg-zinc'
        >
            <div className='screen-max-width'>
                <div className='mb-12 w-full md:flex items-end justify-between'>
                    {/* ----- 섹션 제목: 회색글자, 동적 크기 조정, 숨겨짐, 80px 아래 배치 ----- */}
                    <h1 id='title' className='section-heading'>
                        Get the highlights.
                    </h1>
                    {/* ----- 컨트롤 영역: 플레이 버튼, 이벤트 화살표 ----- */}
                    <div className='flex flex-wrap items-end gap-5'>
                        {/* 클래스 link : 최초 숨김, 80px 아래 배치  */}
                        <p className='link'>
                            Watch the film
                            <img src={watchImg} alt='watch' className='ml-2' />
                        </p>
                        <p className='link'>
                            Watch the event
                            <img src={rightImg} alt='right' className='ml-2' />
                        </p>
                    </div>
                </div>

                <VideoCarousel />
            </div>
        </section>
    );
};
export default Highlights;
