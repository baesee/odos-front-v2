import { Box } from '@mui/material';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh', // 뷰포트 높이로 설정
                maxWidth: '500px',
                margin: '0 auto',
                bgcolor: 'background.paper',
                overflow: 'hidden', // 전체 레이아웃의 오버플로우를 숨김
            }}
        >
            <Header />
            <MainContent />
            <Footer />
        </Box>
    );
}

export default App;
