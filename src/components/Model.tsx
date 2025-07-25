'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react'; // ********************* useRef, useState Hook
import ModelView from './ModelView'; // ********************* 실제 개별 모델 컴포넌트
import { yellowImg } from '@/utils'; // ********************* 모델 이미지(노랑)
import * as THREE from 'three'; // ********************* three.js
import { Canvas } from '@react-three/fiber'; // ***************** 3d canvas
import { View } from '@react-three/drei'; // ***************** 3d view
import { models, sizes } from '@/constants'; // ********************* 모델 및 Size 정보 데이터 가져오기

const Model = () => {
    const [size, setSize] = useState('small'); // ********************** 사이즈 설정 상태변수
    // *********************************************** 모델 정보 상태 변수 (초기 정보값 설정)
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium', // 모델명
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'], // 모델 색상 배열
        img: yellowImg,
    });

    // *********************************************** 모델 뷰를 위한 카메라 컨트롤 참조 변수(Ref)
    const cameraControlSmallRef = useRef(null);
    const cameraControlLargeRef = useRef(null);

    // *********************************************** 실제 모델 참조 변수
    const small = useRef(new THREE.Group()); // 작은 모델 참조
    const large = useRef(new THREE.Group()); // 큰 모델 참조

    // *********************************************** 모델 회전각 상태 변수
    const [smallRotation, setSmallRotation] = useState(0); // 작은 모델 회전각
    const [largeRotation, setLargeRotation] = useState(0); //  큰 모델 회전각

    useGSAP(() => {
        gsap.to('#heading', {
            opacity: 1, // 보이기
            y: 0, // 원래위치로 이동
        });
    }, []);

    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                {/* ----- 섹션 제목: 회색글자, 동적 크기 조정, 숨겨짐, 80px 아래 배치 ----- */}
                <h1 id='heading' className='section-heading'>
                    Take a closer look.
                </h1>
                {/* ----- 모델 컨테이너 ----- */}
                <div className='flex flex-col items-center mt-5'>
                    <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                        {/* *********************** 실제 모델 이미지 (small) --------- */}
                        <ModelView
                            index={1} // 랜더링될 모델 번호
                            groupRef={small} // 동일한 그룹 참조
                            gsapType='view1' // gsap 애니메이션 타입
                            controlRef={cameraControlSmallRef} // 카메라 제어를 위한 참조
                            setRotationState={setSmallRotation} // 회전각 상태변수
                            item={model} // 모델 정보
                            size={size} // 사이즈 정보
                        />
                        {/* *********************** 실제 모델 이미지 (large) --------- */}
                        <ModelView
                            index={2} // 랜더링될 모델 번호
                            groupRef={large} // 동일한 그룹 참조
                            gsapType='view2' // gsap 애니메이션 타입
                            controlRef={cameraControlLargeRef} // 카메라 제어를 위한 참조
                            setRotationState={setLargeRotation} // 회전각 상태변수
                            item={model} // 모델 정보
                            size={size} // 사이즈 정보
                        />
                        {/* *********************** 모델이 배치될 캔버스 --------- */}
                        <Canvas
                            className='w-full h-full' // 부모 컨테이너 영역 차지
                            style={{
                                position: 'fixed', // 부모 컨테이너에 고정
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden',
                            }}
                            eventSource={document.getElementById('root')} // app > page.tsx 의 main id='root' 참조
                        >
                            <View.Port />
                        </Canvas>
                    </div>

                    {/* *********************** 모델 정보 텍스트 영역 --------- */}
                    <div className='mx-auto w-full'>
                        {/* ----- 작은 타이틀  ----- */}
                        <p className='text-sm font-light text-center mb-5'>
                            {model.title}
                        </p>
                        {/* ----- 추가 정보 영역   ----- */}
                        <div className='flex-center'>
                            {/* ----- 색상 선택 콘트롤 영역   ----- */}
                            <ul className='color-container'>
                                {models.map((item, i) => (
                                    <li
                                        key={i}
                                        className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                                        style={{
                                            backgroundColor: item.color[0],
                                        }}
                                        onClick={() => setModel(item)}
                                    />
                                ))}
                            </ul>
                            {/* ----- 우측 Size 선택 스위치 버튼 영역   ----- */}
                            <button className='size-btn-container'>
                                {sizes.map(({ label, value }) => (
                                    <span
                                        key={label}
                                        className='size-btn'
                                        style={{
                                            backgroundColor:
                                                size === value
                                                    ? 'white'
                                                    : 'transparent',
                                            color:
                                                size === value
                                                    ? 'black'
                                                    : 'white',
                                        }}
                                        onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Model;
