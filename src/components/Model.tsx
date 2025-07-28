'use client';

import { useRef, useState } from 'react'; // ********************* useEffect 추가
import ModelView from './ModelView';
import { yellowImg } from '@/utils'; //  모델 이미지(노랑)
import * as THREE from 'three'; //  three.js
import { Canvas } from '@react-three/fiber'; //  3d canvas
import { View } from '@react-three/drei'; //  3d view
import { models, sizes } from '@/constants'; //  모델 및 Size 정보 데이터 가져오기

const Model = () => {
    const [size, setSize] = useState('small'); //  사이즈 설정 상태변수
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium', // 모델명
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'], // 모델 색상 배열
        img: yellowImg,
    });

    //  모델 뷰를 위한 카메라 컨트롤 참조 변수(Ref)
    const cameraControlSmallRef = useRef(null);
    const cameraControlLargeRef = useRef(null);

    //  실제 모델 참조 변수
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    //  모델 회전각 상태 변수
    const [smallRotation, setSmallRotation] = useState(0); // 작은 모델 회전각
    const [largeRotation, setLargeRotation] = useState(0); //  큰 모델 회전각

    const canvasWrapperRef = useRef<HTMLDivElement | null>(null); //  3d 모델을 표시할 캔바스 참조

    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>
                    Take a closer look.
                </h1>

                <div className='flex flex-col items-center mt-5'>
                    {/* canvasWrapperRef를 div에 연결 */}
                    <div
                        className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'
                        ref={canvasWrapperRef}
                    >
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType='view1'
                            controlRef={cameraControlSmallRef}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />
                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType='view2'
                            controlRef={cameraControlLargeRef}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}
                        />
                        <Canvas
                            className='w-full h-full'
                            style={{
                                position: 'fixed',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden',
                            }}
                            eventSource={canvasWrapperRef} // ref 객체 자체를 전달
                        >
                            <View.Port />
                        </Canvas>
                    </div>

                    <div className='mx-auto w-full'>
                        <p className='text-sm font-light text-center mb-5'>
                            {model.title}
                        </p>
                        <div className='flex-center'>
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
