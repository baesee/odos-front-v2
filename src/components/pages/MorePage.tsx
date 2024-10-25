import React, { useState } from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Collapse,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useContentHeight } from '../../utils/useContentHeight';

interface MoreItem {
    title: string;
    content: string;
}

const MorePage: React.FC = () => {
    const contentHeight = useContentHeight();
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        '공지사항': false,
        'FAQ': false,
        '사용법': true, // 사용법은 기본적으로 펼쳐진 상태
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const notices: MoreItem[] = [
        { title: '공지사항 1', content: '공지사항 1의 내용입니다.' },
        { title: '공지사항 2', content: '공지사항 2의 내용입니다.' },
        { title: '공지사항 3', content: '공지사항 3의 내용입니다.' },
    ];

    const faqs: MoreItem[] = [
        { title: 'FAQ 1', content: 'FAQ 1의 답변입니다.' },
        { title: 'FAQ 2', content: 'FAQ 2의 답변입니다.' },
        { title: 'FAQ 3', content: 'FAQ 3의 답변입니다.' },
    ];

    const usageGuides: MoreItem[] = [
        { title: '사용법', content: 'ODOS 앱 사용법에 대한 상세 설명입니다.' },
    ];

    const renderSection = (title: string, items: MoreItem[], maxItems: number) => (
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
                    {items.slice(0, maxItems).map((item, index) => (
                        <ListItem key={index} sx={{ pl: 4, py: 1 }}>
                            <ListItemText
                                primary={item.title}
                                secondary={item.content}
                                secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </Box>
    );

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
