import React, { useState, useEffect } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Collapse,
    IconButton,
    CircularProgress,
    Typography,
    Paper,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShareIcon from '@mui/icons-material/Share';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useContentHeight } from '../../utils/useContentHeight';
import {
    fetchFAQList,
    fetchNoticeList,
    FAQ,
    Notice,
} from '../../api/morePageApi';
import { isIOS, isAndroid, isMobile } from '../../utils/deviceDetect';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AndroidIcon from '@mui/icons-material/Android';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface GuideItem {
    title: string;
    content: React.ReactNode;
}

const MorePage: React.FC = () => {
    const contentHeight = useContentHeight();
    const [openSections, setOpenSections] = useState<{
        [key: string]: boolean;
    }>({
        공지사항: false,
        FAQ: false,
        사용법: true,
    });
    const [notices, setNotices] = useState<Notice[]>([]);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [noticeResponse, faqResponse] = await Promise.all([
                    fetchNoticeList(),
                    fetchFAQList(),
                ]);
                setNotices(noticeResponse.data);
                setFaqs(faqResponse.data);
            } catch (err) {
                setError('데이터를 불러오는 데 실패했습니다.');
                console.error('데이터 로딩 오류:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const InstallGuide = () => {
        if (!isMobile()) {
            return null;
        }

        if (isIOS()) {
            return (
                <Stack spacing={3} sx={{ p: 2 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                border: '1px solid rgba(38, 49, 94, 0.3)',
                            }}
                        >
                            <Stack spacing={3}>
                                <Box sx={{ textAlign: 'center', mb: 2 }}>
                                    <PhoneIphoneIcon
                                        sx={{ fontSize: 48, color: '#26315e' }}
                                    />
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ color: 'white', mt: 1 }}
                                    >
                                        iOS 설치 가이드
                                    </Typography>
                                </Box>

                                <Stack spacing={4}>
                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <OpenInBrowserIcon
                                                sx={{
                                                    color: '#26315e',
                                                    fontSize: 24,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Safari 브라우저로 접속
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 4,
                                            }}
                                        >
                                            Safari 브라우저에서만 설치가
                                            가능합니다
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <IosShareIcon
                                                sx={{
                                                    color: '#26315e',
                                                    fontSize: 24,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                공유 버튼 선택
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 4,
                                            }}
                                        >
                                            하단의 공유 버튼을 탭하세요
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <SystemUpdateIcon
                                                sx={{
                                                    color: '#26315e',
                                                    fontSize: 24,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                홈 화면에 추가
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 4,
                                            }}
                                        >
                                            '홈 화면에 추가' 옵션을 선택하세요
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <CheckCircleIcon
                                                sx={{
                                                    color: '#26315e',
                                                    fontSize: 24,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                설치 완료
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 4,
                                            }}
                                        >
                                            '추가' 버튼을 눌러 설치를 완료하세요
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Box>
                </Stack>
            );
        }

        if (isAndroid()) {
            return (
                <Stack spacing={3} sx={{ p: 2 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 2,
                                border: '1px solid rgba(38, 49, 94, 0.3)',
                            }}
                        >
                            <Stack spacing={3}>
                                <Box sx={{ textAlign: 'center', mb: 2 }}>
                                    <AndroidIcon
                                        sx={{ fontSize: 48, color: '#26315e' }}
                                    />
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ color: 'white', mt: 1 }}
                                    >
                                        Android 설치 가이드
                                    </Typography>
                                </Box>

                                <Stack spacing={4}>
                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <OpenInBrowserIcon
                                                sx={{
                                                    color: '#26315e',
                                                    fontSize: 24,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Chrome 브라우저 확인
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 4,
                                            }}
                                        >
                                            Chrome 브라우저에서 접속하세요
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <MoreVertIcon
                                                sx={{
                                                    color: '#26315e',
                                                    fontSize: 24,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                메뉴 열기
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 4,
                                            }}
                                        >
                                            브라우저 상단의 메뉴(⋮)를 탭하세요
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <AddToHomeScreenIcon
                                                sx={{
                                                    color: '#26315e',
                                                    fontSize: 24,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                홈 화면에 추가
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 4,
                                            }}
                                        >
                                            '홈 화면에 추가' 메뉴를 선택하세요
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <CheckCircleIcon
                                                sx={{
                                                    color: '#26315e',
                                                    fontSize: 24,
                                                }}
                                            />
                                            <Typography
                                                component="div"
                                                sx={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                설치 완료
                                            </Typography>
                                        </Stack>
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 4,
                                            }}
                                        >
                                            '추가' 버튼을 눌러 설치를 완료하세요
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Box>
                </Stack>
            );
        }
    };

    const UpdateTimeGuide = () => (
        <Stack spacing={3} sx={{ p: 2 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 2 }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <AccessTimeIcon
                            sx={{ color: '#26315e', fontSize: 30 }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -4,
                                right: -4,
                                backgroundColor: '#26315e',
                                borderRadius: '50%',
                                width: 16,
                                height: 16,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: 'white',
                            }}
                        >
                            2
                        </Box>
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{ color: 'white', fontSize: '1.1rem' }}
                        component="div"
                    >
                        매일 2번의 새로운 명언
                    </Typography>
                </Stack>
                <Box sx={{ pl: 6 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 1 }}
                    >
                        <AutorenewIcon
                            sx={{ color: '#26315e', fontSize: 20 }}
                        />
                        <Typography
                            sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                            component="div"
                        >
                            오전 9시 업데이트
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AutorenewIcon
                            sx={{ color: '#26315e', fontSize: 20 }}
                        />
                        <Typography
                            sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
                            component="div"
                        >
                            오후 6시 업데이트
                        </Typography>
                    </Stack>
                </Box>
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <LightbulbIcon sx={{ color: '#26315e', fontSize: 30 }} />
                    <Typography
                        sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                        component="div"
                    >
                        매일 새로운 명언으로 당신의 하루를 더욱 특별하게
                        만들어보세요!
                    </Typography>
                </Stack>
            </Paper>
        </Stack>
    );

    const usageGuides: GuideItem[] = [
        {
            title: '새로운 명언 업데이트',
            content: <UpdateTimeGuide />,
        },
        ...(isMobile()
            ? [
                  {
                      title: '홈 화면에 APP 설치하기',
                      content: <InstallGuide />,
                  },
              ]
            : []),
    ];

    const renderSection = (
        title: string,
        items: GuideItem[] | Notice[] | FAQ[],
        maxItems: number
    ) => (
        <Box sx={{ mb: 2 }}>
            <ListItem
                onClick={() => toggleSection(title)}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    mb: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    {/* 각 섹션별 아이콘 */}
                    <Box
                        sx={{
                            mr: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            ...(openSections[title] && {
                                backgroundColor: '#26315e',
                                transform: 'rotate(5deg)',
                            }),
                        }}
                    >
                        {title === '공지사항' && (
                            <NotificationsIcon
                                sx={{ color: 'white', fontSize: 24 }}
                            />
                        )}
                        {title === 'FAQ' && (
                            <QuestionAnswerIcon
                                sx={{ color: 'white', fontSize: 24 }}
                            />
                        )}
                        {title === '사용법' && (
                            <MenuBookIcon
                                sx={{ color: 'white', fontSize: 24 }}
                            />
                        )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            component="div"
                            sx={{
                                color: 'white',
                                fontSize:
                                    title === '사용법' ? '1.1rem' : '1rem',
                                fontWeight: title === '사용법' ? 600 : 400,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {title}
                            {title === '사용법' && (
                                <Box
                                    sx={{
                                        ml: 1,
                                        backgroundColor: '#26315e',
                                        color: 'white',
                                        px: 1,
                                        py: 0.2,
                                        borderRadius: '12px',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    GUIDE
                                </Box>
                            )}
                        </Typography>
                        {openSections[title] && (
                            <Typography
                                component="div"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontSize: '0.8rem',
                                    mt: 0.5,
                                }}
                            >
                                {title === '공지사항' &&
                                    '중요 공지사항을 확인하세요'}
                                {title === 'FAQ' &&
                                    '자주 묻는 질문들을 확인하세요'}
                                {title === '사용법' && '앱 사용법을 확인하세요'}
                            </Typography>
                        )}
                    </Box>
                </Box>
                <IconButton
                    edge="end"
                    sx={{
                        color: 'white',
                        transform: openSections[title]
                            ? 'rotate(180deg)'
                            : 'none',
                        transition: 'transform 0.3s ease',
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </ListItem>
            <Collapse in={openSections[title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {items.length > 0 ? (
                        items.slice(0, maxItems).map((item, index) => (
                            <ListItem key={index} sx={{ pl: 4, py: 1 }}>
                                {/* ListItemText를 Box와 Typography로 대체 */}
                                <Box sx={{ width: '100%' }}>
                                    <Typography
                                        component="div"
                                        sx={{ color: 'white' }}
                                    >
                                        {item.title}
                                    </Typography>
                                    {item.content && (
                                        <Typography
                                            component="div"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                mt: 0.5,
                                            }}
                                        >
                                            {item.content}
                                        </Typography>
                                    )}
                                </Box>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem sx={{ pl: 4, py: 1 }}>
                            <Typography
                                component="div"
                                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                                조회된 내용이 없습니다.
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </Collapse>
        </Box>
    );

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ color: 'error.main', textAlign: 'center', p: 2 }}>
                {error}
            </Box>
        );
    }

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                background:
                    'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
                height: `${contentHeight}px`,
                overflowY: 'auto',
            }}
        >
            {renderSection('공지사항', notices, 5)}
            {renderSection('FAQ', faqs, 5)}
            {renderSection('사용법', usageGuides, 5)}
        </Box>
    );
};

export default MorePage;
