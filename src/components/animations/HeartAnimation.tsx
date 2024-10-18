// React와 필요한 컴포넌트들을 임포트합니다.
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';

// 컴포넌트의 props 타입을 정의합니다.
interface HeartAnimationProps {
    onComplete: () => void;
}

// HeartAnimation 컴포넌트를 정의합니다.
const HeartAnimation: React.FC<HeartAnimationProps> = ({ onComplete }) => {
    return (
        // AnimatePresence는 컴포넌트가 DOM에서 제거될 때 애니메이션을 적용합니다.
        <AnimatePresence>
            {/* motion.div는 애니메이션이 적용될 요소입니다. */}
            <motion.div
                // 초기 상태를 설정합니다.
                initial={{ scale: 0, y: 0 }}
                // 애니메이션 상태를 정의합니다.
                animate={{
                    scale: [0.5, 1.5, 0.6], // 크기가 0에서 1.3배로 커졌다가 1배로 돌아옵니다.
                    y: [0, 0, window.innerHeight * 0.44], // 수직 위치가 변경됩니다.
                }}
                // 컴포넌트가 사라질 때의 상태를 정의합니다.
                exit={{ scale: 0, y: window.innerHeight * 0.44 }}
                // 애니메이션의 지속 시간과 이징 함수를 설정합니다.
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                // 애니메이션이 완료되면 onComplete 함수를 호출합니다.
                onAnimationComplete={onComplete}
                // 스타일을 정의합니다.
                style={{
                    position: 'fixed',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%', // 추가: 전체 너비를 사용
                    pointerEvents: 'none', // 추가: 클릭 이벤트 방지
                }}
            >
                {/* 하트 아이콘을 표시합니다. */}
                <FavoriteIcon style={{ fontSize: 45, color: 'red' }} />
            </motion.div>
        </AnimatePresence>
    );
};

// 컴포넌트를 내보냅니다.
export default HeartAnimation;
