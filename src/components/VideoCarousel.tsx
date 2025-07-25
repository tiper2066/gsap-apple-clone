'use client';

import { hightlightsSlides } from '@/constants'; // 비디오의 개별(4개) 정보를 담은 데이터 배열
import { pauseImg, playImg, replayImg } from '@/utils'; //  멈춤, 플레이, 리플레이 버튼 이미지
import { useGSAP } from '@gsap/react'; //  useGSAP
import gsap from 'gsap'; //  GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // ********** scrollTrigger 속성 사용을 위해 반드시 필요!
import { useEffect, useRef, useState } from 'react'; //  useEffect, useRef, useState Hook

gsap.registerPlugin(ScrollTrigger); // ****************** ScrollTrigger 플러그인 등록 필요!

const VideoCarousel = () => {
    const videoRef = useRef<HTMLVideoElement[]>([]); //  실제 비디오 요소 참조
    const videoSpanRef = useRef<HTMLSpanElement[]>([]); // 표시자 내부 프로그래스바 참조
    const videoDivRef = useRef<HTMLSpanElement[]>([]); // 표시자 (원형돗) 컨테이너 참조

    // 비디오 상태를 위한 상태 객체 선언
    const [video, setVideo] = useState({
        startPlay: false, // 시작 여부 (시작안함)
        videoId: 0, // 현재 비디오의 id 값 (0)
        isLastVideo: false, // 마지막 비디오인지 여부 (마지막 아님)
        isPlaying: false, // 재생 중인지 여부 (재생 중 아님)
    });

    const [loadedData, setLoadedData] = useState<number[]>([]); // 로딩된 비디오 전체 배열

    const { isLastVideo, startPlay, videoId, isPlaying } = video; // 현재 비디오 객체에서 상태값 추출

    // ***************************************** 영상 슬라이더 GSAP애니메이션
    useGSAP(() => {
        gsap.to('.slider', {
            transform: `translateX(${-100 * videoId}%)`, // 현재 비디오 순서의 너비 만큼 좌측으로 이동
            duration: 2,
            ease: 'power2.inOut', // 효과 테스트:  https://gsap.com/docs/v3/Eases
        });

        // 현재 비디오 요소가 존재한다면... GSAP 애니메이션을 실행함 (videoRef 가 null 일 경우 문제 방지)
        if (videoRef.current[videoId]) {
            gsap.to(videoRef.current[videoId], {
                scrollTrigger: {
                    trigger: `#video-${videoId}`, // 동적 비디오 id 요소 참조
                    // 스크롤이 특정 지점(트리거 지점)을 지나갈 때 어떻게 반응할지 정의
                    // 1. onEnter: 요소가 화면에 들어올 때,   2. onLeave: 요소가 화면을 벗어날 때,
                    // 3. onEnterBack: 요소가 화면에 다시 들어올 때, 4. onLeaveBack: 요소가 화면을 다시 벗어날 때
                    // 상태값 :  play, pause, resume: 일시 중지를 재생, reset: 영상 맨앞으로, restart: 다시 플레이
                    // complete: 마지막으로 이동, reverse: 거꾸로 재생, none: 아무 동작 안함
                    toggleActions: 'play none none none', // 비디오가 화면에 들어 올때 플레이함.
                    start: 'top 80%', // 비디오 요소 상단이 화면 80% 높이에 닿으면 애님 시작

                    //  요소가 화면에 들어 올때 실행 함수 -----------------------
                    onEnter: () => {
                        // 현재 비디오 상태 업데이트
                        setVideo((prev) => ({
                            ...prev,
                            startPlay: true,
                            isPlaying: true,
                        }));
                        // 만일 현재 비디오가 존재한다면...
                        if (videoRef.current[videoId]) {
                            // 현재 비디오를 실행하고, 에러가 있다면 출력함
                            videoRef.current[videoId]
                                .play()
                                .catch((err) =>
                                    console.error(
                                        'ScrollTrigger play error:',
                                        err
                                    )
                                );
                        }
                    },
                },
            });
        }
    }, [videoId]); // 현재 비디오 업데이트될때 실행

    // ***************************************** 진행바 초기화 함수
    const resetProgressBars = () => {
        // 현재 진행막대 컨테이너 내부 요소(span)를 원래 길이로 변경
        videoDivRef.current.forEach((div, index) => {
            if (div) {
                gsap.to(div, {
                    width: '12px',
                    duration: 0.3,
                    overwrite: true,
                });
            }
        });
        // 프로그레스바 길이를 0로 변경(안보이게)
        videoSpanRef.current.forEach((span, index) => {
            if (span) {
                gsap.to(span, {
                    width: '0%',
                    backgroundColor: '#afafaf',
                    duration: 0.3,
                    overwrite: true,
                });
            }
        });
        // console.log('Progress bars reset');
    };

    // ***************************************** 프로그레스바 애니메이션
    useEffect(() => {
        let currentProgress = 0; // 진행률 0%
        const span = videoSpanRef.current[videoId]; // 현재 진행바 선택

        // 비디오가 존재한다면... 이전 진행바 초기화 (안보이게, 너비 0%)
        if (videoId !== 0) {
            videoSpanRef.current.forEach((span, index) => {
                if (index !== videoId && span) {
                    gsap.to(span, {
                        width: '0%',
                        backgroundColor: '#afafaf',
                        duration: 0.3,
                        overwrite: true,
                    });
                }
            });
            // 이전 표시자를 원래 원형으로 변경
            videoDivRef.current.forEach((div, index) => {
                if (index !== videoId && div) {
                    gsap.to(div, {
                        width: '12px',
                        duration: 0.3,
                        overwrite: true,
                    });
                }
            });
        }

        // 비디오가 존재하고, 진행바가 존재하면...
        if (span && videoRef.current[videoId]) {
            // 진행바 진행율을 100% 까지 업데이트(애니메이션) 한다.
            const anim = gsap.to(span, {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100); // 전체 진행율
                    // 전체 진행율과 현재 진행율이 다르면...
                    if (progress !== currentProgress) {
                        currentProgress = progress; // 진행율 갱신
                        // 화면 너비에 따라서 표시자 컨테이너 너비 조절
                        gsap.to(videoDivRef.current[videoId], {
                            width:
                                window.innerWidth < 760
                                    ? '10vw'
                                    : window.innerWidth < 1200
                                    ? '10vw'
                                    : '4vw',
                        });
                        // 프로그레스바 너비와 색상 변경
                        gsap.to(span, {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white',
                        });
                    }
                },
                // 애니메이션이 완료되면.... 영상 중지, 표시자 너비와 프로그레스바 색상 리셋
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',
                        });
                        gsap.to(span, {
                            backgroundColor: '#afafaf',
                        });
                    }
                },
            });

            // 비디오 영상이 존재할 경우만 (null 이 아닐 경우만) 애니메이션을 다시 실행함
            if (videoId === 0) {
                anim.restart(); // gsap.to()에서 반환된 객체를 제어하는 메소드, play(), stop(), pause(), resume(다시시작) 등도 제공해줌
            }

            // 비디오 재생 상태(isPlaying) 에 따라 애니메이션 갱신하는 함수  -----------------------
            const animUpdate = () => {
                if (
                    videoRef.current[videoId] && // 비디오가 존재하고..
                    hightlightsSlides[videoId]?.videoDuration // 그 비디오가 동영상이라면(재생 시간이 남았다면)
                ) {
                    // 프로그레스바를 업데이트한다.
                    anim.progress(
                        videoRef.current[videoId].currentTime /
                            hightlightsSlides[videoId].videoDuration
                    );
                }
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }

            return () => gsap.ticker.remove(animUpdate);
        }
    }, [startPlay, videoId, isPlaying]);

    // ************************************ 비디오 재생 제어 함수
    useEffect(() => {
        // console.log( 'Video state:', { videoId, isPlaying, startPlay, loadedData }, 'videoRef:', videoRef.current[videoId] );

        // 비디오가 null 이 아니고, 로딩된 비디오 배열에 현재 비디오가 포함되어 있다면...
        if (videoRef.current[videoId] && loadedData.includes(videoId)) {
            // 비디오를 재생하고
            if (isPlaying && startPlay) {
                videoRef.current[videoId]
                    .play()
                    .catch((err) => console.error('Play error:', err));
            }
            // 비디오가 현재 재생 비디오가 아니면..
            else {
                videoRef.current[videoId].pause(); // 비디오 재생을 멈춤
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    // ************************************ 비디오 상태 처리 함수
    const handleProcess = (type: string, index?: number) => {
        // console.log('handleProcess:', type, index);
        switch (type) {
            case 'video-end':
                setVideo((prev) => ({ ...prev, videoId: (index ?? 0) + 1 })); // 영상이 끝났다면 다음 영상으로 이동
                break;
            case 'video-last': // 마지막 영상이라면 .. 현재 비디오 상태 업데이트
                setVideo((prev) => ({
                    ...prev,
                    isLastVideo: true,
                    isPlaying: false,
                }));
                break;
            case 'video-reset': // 리셋 상태라면( 슬라이더 처음 표시상태로 돌림 )...
                resetProgressBars(); // 리셋 시 진행바 초기화...
                // 첫버째 영상 플레이 상태로 갱신
                setVideo((prev) => ({
                    ...prev,
                    videoId: 0,
                    isLastVideo: false,
                    isPlaying: true,
                    startPlay: true,
                }));
                break;
            case 'play': // 비디오 재생 상태라면... 현재 비디오 재생하고.. 상태를 업데이트함
                if (videoRef.current[videoId]) {
                    videoRef.current[videoId]
                        .play()
                        .catch((err) =>
                            console.error('Play button error:', err)
                        );
                    setVideo((prev) => ({
                        ...prev,
                        isPlaying: true,
                        startPlay: true,
                    }));
                }
                break;
            case 'pause': // 비디오 재생 중단 상태라면... 멈추고 상태 갱신
                if (videoRef.current[videoId]) {
                    videoRef.current[videoId].pause();
                    setVideo((prev) => ({ ...prev, isPlaying: false }));
                }
                break;
            case 'video-select': // 비디오 선택 상태라면...
                resetProgressBars(); // 슬라이드 선택 시 진행바 초기화
                // 슬라이더 최초 표시 상태로 변경
                setVideo((prev) => ({
                    ...prev,
                    videoId: index ?? 0,
                    isPlaying: true,
                    startPlay: true,
                }));
                break;
            default:
                break;
        }
    };

    // ************************************ 메타데이터 로드 핸들러 (비디오 로딩상태 확인 후 )
    const handleLoadedMetaData = (
        index: number,
        e: React.SyntheticEvent<HTMLVideoElement>
    ) => {
        setLoadedData((prev) => [...new Set([...prev, index])]); // 모든 비디오를 배열에 저장
        // console.log(`Video ${index} metadata loaded, loadedData:`, [ ...new Set([...loadedData, index]) ]);
    };

    return (
        <>
            {/* -------------------- 비디오 슬라이드 컨테이너 -------------------- */}
            <div className='flex items-center'>
                {hightlightsSlides.map((list, index) => (
                    <div key={list.id} className='slider sm:pr-20 pr-10'>
                        <div className='video-carousel_container'>
                            <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                                <video
                                    id={`video-${index}`} // 반복문에서 여러개의 비디오에 동적 id 값 설정
                                    playsInline
                                    className={`${
                                        list.id === 2 && 'translate-x-44'
                                    } pointer-events-none`}
                                    preload='auto'
                                    muted
                                    ref={(el) => {
                                        if (el) videoRef.current[index] = el;
                                    }}
                                    onEnded={() =>
                                        index < hightlightsSlides.length - 1
                                            ? handleProcess('video-end', index)
                                            : handleProcess('video-last')
                                    }
                                    onPlay={() =>
                                        setVideo((prev) => ({
                                            ...prev,
                                            isPlaying: true,
                                        }))
                                    }
                                    // 비디오가 로딩되었는지 확인
                                    onLoadedMetadata={(e) =>
                                        handleLoadedMetaData(index, e)
                                    }
                                    onError={(e) =>
                                        console.error(
                                            `Video ${index} error:`,
                                            e
                                        )
                                    }
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((text, i) => (
                                    <p
                                        key={i}
                                        className='md:text-2xl text-xl font-medium'
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* -------------------- 프로그레스 표시자 및 콘트롤 버튼 컨테이너 -------------------- */}
            <div className='relative flex-center mt-10'>
                {/* ----- 프로그레스 표시자 ----- */}
                <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
                    {hightlightsSlides.map((_, i) => (
                        <span
                            key={i}
                            className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                            ref={(el) => {
                                if (el) videoDivRef.current[i] = el;
                            }}
                            onClick={() => handleProcess('video-select', i)}
                        >
                            {/* 내부 프로그래그 바 */}
                            <span
                                className='absolute h-full w-full rounded-full'
                                ref={(el) => {
                                    if (el) videoSpanRef.current[i] = el;
                                }}
                            />
                        </span>
                    ))}
                </div>
                {/* ----- 콘트롤 버튼 ----- */}
                <button className='control-btn'>
                    <img
                        src={
                            isLastVideo
                                ? replayImg
                                : !isPlaying
                                ? playImg
                                : pauseImg
                        }
                        alt={
                            isLastVideo
                                ? 'replay'
                                : !isPlaying
                                ? 'play'
                                : 'pause'
                        }
                        onClick={() =>
                            isLastVideo
                                ? handleProcess('video-reset')
                                : !isPlaying
                                ? handleProcess('play')
                                : handleProcess('pause')
                        }
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;
