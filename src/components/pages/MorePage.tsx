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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useContentHeight } from '../../utils/useContentHeight';
import { fetchFAQList, fetchNoticeList, FAQ, Notice } from '../../api/morePageApi';

const MorePage: React.FC = () => {
    const contentHeight = useContentHeight();
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        '공지사항': false,
        'FAQ': false,
        '사용법': true,
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
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const usageGuides = [
        { title: '사용법', content: 'ODOS 앱 사용법에 대한 상세 설명입니다.' },
    ];

    const renderSection = (title: string, items: any[], maxItems: number) => (
        <Box sx={{ mb: 2 }}>
            <ListItem
                onClick={() => toggleSection(title)}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    mb: 1,
                    cursor: 'pointer',
                }}
            >
                <ListItemText primary={title} />
                <IconButton edge="end">
                    {openSections[title] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </ListItem>
            <Collapse in={openSections[title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {items.length > 0 ? (
                        items.slice(0, maxItems).map((item, index) => (
                            <ListItem key={index} sx={{ pl: 4, py: 1 }}>
                                <ListItemText
                                    primary={item.title}
                                    secondary={item.content || item.answer}
                                    secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <ListItem sx={{ pl: 4, py: 1 }}>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
                background: 'linear-gradient(to bottom, #2a2a4e, #26315e, #1f4480)',
                color: 'white',
                height: `${contentHeight}px`,
                overflowY: 'auto',
            }}
        >
            {renderSection('공지사항', notices, 5)}
            {renderSection('FAQ', faqs, 5)}
            {renderSection('사용법', usageGuides, 1)}
        </Box>
    );
};

export default MorePage;
