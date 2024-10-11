import { Box, CssBaseline } from '@mui/material';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import Footer from './components/layout/Footer';

function App() {
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    maxWidth: '500px',
                    margin: '0 auto',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    boxShadow: '0px 0px 55px rgba(0, 0, 0, 0.7)', // 그림자 효과 추가
                    borderRadius: '10px', // 모서리를 둥글게 만듭니다 (선택사항)
                }}
            >
                <Header />
                <MainContent />
                <Footer />
            </Box>
        </>
    );
}

export default App;
