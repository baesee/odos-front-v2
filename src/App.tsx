import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

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
