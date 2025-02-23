// 添加 Deepseek API 配置
const DEEPSEEK_API_KEY = 'sk-fd2626c8d2654f29acac4fc996136f83';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 添加关键词映射表
const keywordMappings = {
    // 动作类词汇转换
    "做": "开展|推进|实施|落实|执行|部署",
    "搞": "实施|开展|推动|落实|执行|推进",
    "弄": "实施|开展|落实|完成|推进|部署",
    "完成": "圆满完成|顺利实现|有效达成|成功落实|如期完成|高效完成",
    "做好": "高质量完成|有效推进|扎实开展|全面落实|深入开展|统筹推进",
    "改": "优化|调整|完善|提升|改进|升级",
    "改变": "转变|调整|优化|提升|完善|创新",
    
    // 程度类词汇转换
    "很多": "大量|众多|多元化|多维度|多方位|全方位",
    "不错": "显著|良好|突出|卓越|优异|明显",
    "很好": "显著|卓越|优异|突出|出色|显著",
    "特别": "尤为|格外|特别|极为|尤其|显著",
    "非常": "高度|充分|显著|极为|尤为|特别",
    
    // 数量类词汇转换
    "一些": "若干|多个|多项|诸多|系列|一批",
    "好多": "大量|众多|诸多|多项|多个|系列",
    "几个": "若干|多个|部分|相关|重点|关键",
    "许多": "众多|大量|诸多|多项|系列|多个",
    
    // 时间类词汇转换
    "马上": "即将|近期|稍后|后续|适时|及时",
    "立刻": "即刻|迅速|及时|及早|当即|立即",
    "现在": "当前|目前|现阶段|此时|当下|近期",
    "最近": "近期|近阶段|当前|目前|近日|最新",
    
    // 状态类词汇转换
    "在做": "正在推进|正在开展|正在实施|持续推动|积极开展|深入推进",
    "要做": "计划开展|拟将实施|即将推进|预计开展|将要落实|拟定开展",
    "已经": "已|已经|业已|现已|目前已|基本已",
    "快要": "即将|近期|适时|预计|计划|拟将",
    
    // 形容类词汇转换
    "大": "重大|重要|关键|核心|主要|显著",
    "小": "微观|具体|细节|精细|精准|精确",
    "好": "良好|优质|优异|卓越|突出|显著",
    "差": "有待提升|需要改进|有改进空间|需要优化|待完善|需加强",
    
    // 结果类词汇转换
    "成功": "取得成效|实现目标|达到预期|取得进展|成效显著|效果明显",
    "失败": "未达预期|有待改进|需要优化|有提升空间|需要完善|需加强推进",
    "完了": "已完成|已实现|已达成|已落实|已推进|已开展",
    
    // 情感类词汇转换
    "高兴": "满意|欣慰|振奋|鼓舞|积极|正面",
    "担心": "重视|关注|注意|强调|指出|提出",
    "喜欢": "认可|肯定|赞同|支持|赞赏|好评",
    
    // 工作进展类
    "进行中": "正在有序推进|稳步开展|扎实推进|持续深化|全面铺开|积极落实",
    "还没做": "正在研究论证|正在统筹谋划|正在积极筹备|正在科学部署|正在系统规划|正在深入调研",
    "做完了": "已圆满完成|已取得阶段性成果|已实现预期目标|已达到预定效果|已形成工作成果|已取得显著成效",
    
    // 问题处理类
    "有问题": "存在一定挑战|需要进一步优化|有待持续改进|需要重点关注|需要统筹解决|需要系统推进",
    "解决": "妥善处置|有效应对|科学处理|系统解决|统筹推进|协调解决",
    "处理": "统筹协调|系统推进|科学处置|有序开展|积极应对|妥善解决",
    
    // 工作方式类
    "一起": "协同|联动|协作|配合|协调|合作",
    "商量": "研究|探讨|论证|协商|研判|分析",
    "讨论": "研究部署|专题研讨|深入探讨|系统分析|科学论证|集中研判",
    
    // 评价类
    "可以": "符合要求|达到标准|基本具备条件|总体可行|具有可行性|符合预期",
    "不行": "有待改进|需要优化|需要完善|需进一步提升|需加强|需要调整",
    "没问题": "符合标准|达到要求|总体过关|基本合格|总体达标|符合规范",
    
    // 工作态度类
    "认真": "严谨|扎实|细致|深入|全面|系统",
    "努力": "积极|主动|全力|持续|深入|扎实",
    "用心": "专注|细致|深入|认真|扎实|全面",
    
    // 工作效果类
    "效果好": "成效显著|效果明显|成果丰硕|效益突出|绩效优异|表现突出",
    "进展快": "推进有力|进展顺利|成效明显|进度可观|推进有序|进展显著",
    "有成效": "取得实效|成果显著|效果明显|成效突出|效益显著|绩效优异"
};

// 添加场景化的语句模板
const sceneTemplates = {
    policy: [
        text => `根据年度重点工作部署，${text}，为全面深化改革注入新动能。`,
        text => `按照上级工作要求，${text}，推动各项工作高质量开展。`,
        text => `立足新发展阶段，${text}，为企业高质量发展提供有力支撑。`,
        text => `围绕中心工作，${text}，全面提升工作质效。`
    ],
    report: [
        text => `在各部门共同努力下，${text}，工作推进取得显著成效。`,
        text => `通过系统谋划、精心组织，${text}，确保各项任务有序开展。`,
        text => `经过深入调研论证，${text}，工作开展实现新突破。`,
        text => `在上级部门指导下，${text}，各项工作稳步推进。`
    ],
    news: [
        text => `近期，我司${text}，获得各方高度认可。`,
        text => `在推进过程中，${text}，展现了良好的发展态势。`,
        text => `通过创新工作方法，${text}，实现了工作效能的全面提升。`,
        text => `经过系统推进，${text}，取得了阶段性重要成果。`
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const wordCount = document.querySelector('.word-count');
    const generateBtn = document.querySelector('.generate-btn');
    const resultsContainer = document.querySelector('.results-container');

    // 语义转换函数
    function convertToFormalLanguage(input) {
        let text = input;
        
        // 基础词汇转换
        Object.keys(keywordMappings).forEach(key => {
            const replacements = keywordMappings[key].split('|');
            const randomReplacement = replacements[Math.floor(Math.random() * replacements.length)];
            text = text.replace(new RegExp(key, 'g'), randomReplacement);
        });
        
        // 根据内容特征选择合适的场景模板
        let sceneType = 'policy'; // 默认场景
        if (text.includes('报告') || text.includes('总结')) {
            sceneType = 'report';
        } else if (text.includes('新闻') || text.includes('宣传')) {
            sceneType = 'news';
        }
        
        // 应用场景模板
        const templates = sceneTemplates[sceneType];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        return template(text);
    }

    // 修改显示结果函数，优化复制功能
    function displayResults(results) {
        resultsContainer.innerHTML = results.map(result => {
            const escapedContent = result.content.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
            return `
                <div class="result-card">
                    <p class="result-content">${result.content}</p>
                    <div class="result-footer">
                        <span class="scene-tag">${result.scene}</span>
                        <button class="copy-btn" data-text="${escapedContent}">
                            <i class="fas fa-copy"></i>复制
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // 为所有复制按钮添加事件监听器
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-text');
                copyText(textToCopy);
            });
        });
    }

    // 优化复制功能
    function copyText(text) {
        // 创建临时文本区域
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // 选择并复制文本
        textarea.select();
        try {
            document.execCommand('copy');
            // 显示成功提示
            const toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.textContent = '已复制到剪贴板';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        } catch (err) {
            console.error('复制失败:', err);
            // 显示错误提示
            const toast = document.createElement('div');
            toast.className = 'copy-toast error';
            toast.textContent = '复制失败，请手动复制';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }
        
        // 清理临时元素
        document.body.removeChild(textarea);
    }

    // 修改生成结果函数
    async function generateResults(input) {
        // 添加长文本处理
        const maxLength = 1000; // 设置最大字符限制
        if (input.length > maxLength) {
            const toast = document.createElement('div');
            toast.className = 'copy-toast warning';
            toast.textContent = `文本过长，建议分段处理（当前${input.length}字，建议不超过${maxLength}字）`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        // 优化结果展示容器的滚动
        resultsContainer.style.maxHeight = '800px';
        resultsContainer.style.overflowY = 'auto';
        
        if (!input.trim()) {
            const toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.textContent = '请输入需要转换的内容';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
            return;
        }

        const useDeepseek = document.getElementById('useDeepseek').checked;

        if (useDeepseek) {
            // 使用Deepseek API
            resultsContainer.innerHTML = `
                <div class="loading-indicator">
                    <div class="spinner"></div>
                    <p>正在通过Deepseek生成官方表述...</p>
                </div>
            `;

            try {
                const response = await fetchWithRetry(DEEPSEEK_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: "deepseek-chat",
                        messages: [
                            {
                                role: "system",
                                content: "你是一个专业的政府文案写手，擅长将口语化表达转换为正式的官方用语。请将用户输入的内容转换为5种不同场景的官方表述：政策总结、工作报告、新闻稿、数据报告和党建宣传。"
                            },
                            {
                                role: "user",
                                content: `请将以下内容转换为官方用语：${input}`
                            }
                        ],
                        temperature: 0.7,
                        max_tokens: 2000
                    })
                });

                if (!response.ok) {
                    throw new Error('API 请求失败');
                }

                const data = await response.json();
                const generatedContent = data.choices[0].message.content;
                const results = parseApiResponse(generatedContent);
                displayResults(results);

            } catch (error) {
                console.error('生成失败:', error);
                resultsContainer.innerHTML = `
                    <div class="error-message">
                        生成失败，请稍后重试
                    </div>
                `;
            }
        } else {
            // 检查输入是否匹配示例
            const matchedExample = examples.find(example => 
                example.original.toLowerCase().trim() === input.toLowerCase().trim()
            );

            if (matchedExample) {
                // 如果匹配到示例，使用示例的转换结果
                const results = [
                    {
                        content: matchedExample.converted,
                        scene: '标准转换'
                    },
                    {
                        content: `根据年度重点工作部署，${matchedExample.converted}`,
                        scene: '政策总结'
                    },
                    {
                        content: `在工作推进过程中，${matchedExample.converted}`,
                        scene: '工作报告'
                    },
                    {
                        content: `近期，${matchedExample.converted}`,
                        scene: '新闻稿'
                    },
                    {
                        content: `在党建引领下，${matchedExample.converted}`,
                        scene: '党建宣传'
                    }
                ];
                displayResults(results);
            } else {
                // 如果不匹配示例，使用常规转换逻辑
                const formalizedInput = convertToFormalLanguage(input);
                const results = [
                    {
                        content: `根据年度重点工作部署，${formalizedInput}体现了我司在相关领域的显著成效。`,
                        scene: '政策总结'
                    },
                    {
                        content: `在工作推进过程中，${formalizedInput}为后续发展奠定了坚实基础。`,
                        scene: '工作报告'
                    },
                    {
                        content: `近期，我司${formalizedInput}获得了上级部门的充分肯定。`,
                        scene: '新闻稿'
                    },
                    {
                        content: `通过数据分析显示，${formalizedInput}较去年同期提升35%，展现了良好的发展态势。`,
                        scene: '数据报告'
                    },
                    {
                        content: `在党建引领下，${formalizedInput}充分体现了我司高质量发展的决心和成效。`,
                        scene: '党建宣传'
                    }
                ];
                displayResults(results);
            }
        }
    }

    // 解析 API 返回的内容
    function parseApiResponse(content) {
        // 这里可以根据实际返回格式调整解析逻辑
        return [
            {
                content: content.split('\n\n')[0],
                scene: '政策总结'
            },
            {
                content: content.split('\n\n')[1],
                scene: '工作报告'
            },
            {
                content: content.split('\n\n')[2],
                scene: '新闻稿'
            },
            {
                content: content.split('\n\n')[3],
                scene: '数据报告'
            },
            {
                content: content.split('\n\n')[4],
                scene: '党建宣传'
            }
        ];
    }

    // 优化文本框处理
    function enhanceTextarea() {
        const textarea = document.getElementById('inputText');
        
        // 自动调整文本框高度
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight + 2) + 'px';
            
            // 更新字数统计，添加超限提示
            const count = this.value.length;
            const wordCount = document.querySelector('.word-count');
            wordCount.textContent = `已输入：${count}字`;
            if (count > 200) {
                wordCount.style.color = '#ff9800';
            } else {
                wordCount.style.color = 'var(--gray)';
            }
        });
    }

    // 事件监听器
    inputText.addEventListener('input', () => {
        const count = inputText.value.length;
        wordCount.textContent = `已输入：${count}字`;
    });

    inputText.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (e.ctrlKey) {
                const start = inputText.selectionStart;
                const end = inputText.selectionEnd;
                const value = inputText.value;
                inputText.value = value.substring(0, start) + '\n' + value.substring(end);
                inputText.selectionStart = inputText.selectionEnd = start + 1;
            } else {
                e.preventDefault();
                generateResults(inputText.value);
            }
        }
    });

    generateBtn.addEventListener('click', () => {
        generateResults(inputText.value);
    });

    // 修改示例数据和对应的生成逻辑
    const examples = [
        {
            original: '我们今年要招很多人，岗位很多！',
            converted: '2024年度计划面向社会公开招聘多元化岗位，全面扩容人才储备。'
        },
        {
            original: '这个项目做得不错，效果很好。',
            converted: '该项目取得显著成效，充分展现了我司在业务创新方面的核心竞争力。'
        },
        {
            original: '去年培训了500多个新员工。',
            converted: '2023年度累计开展新员工培训项目12期，覆盖500余人次，人才培养成效显著。'
        }
    ];

    let currentExampleIndex = 0;
    const exampleSlider = document.querySelector('.example-slider');
    
    function showExample(index) {
        const example = examples[index];
        exampleSlider.innerHTML = `
            <div class="example-card">
                <div class="original">
                    <h3>原文</h3>
                    <p>${example.original}</p>
                </div>
                <div class="converted">
                    <h3>转换后</h3>
                    <p>${example.converted}</p>
                </div>
            </div>
        `;
    }

    // 自动轮播
    setInterval(() => {
        currentExampleIndex = (currentExampleIndex + 1) % examples.length;
        showExample(currentExampleIndex);
    }, 5000);

    // 初始显示第一个示例
    showExample(0);

    // 更新政策文件范文内容
    const policyTemplates = {
        openings: [
            '为深入贯彻落实习近平新时代中国特色社会主义思想，全面落实党的二十大精神，紧紧围绕新发展理念，立足新发展阶段，服务构建新发展格局，按照高质量发展要求，',
            '为进一步推进我司高质量发展，提升核心竞争力，根据上级文件要求，按照"守正创新、稳中求进"的总体思路，结合企业实际发展需要，经研究研判，现就有关事项通知如下：',
            '为认真落实《关于加强企业创新发展的指导意见》，结合我司实际情况，秉持"改革创新、提质增效"的工作方针，围绕企业"十四五"发展规划，现就相关工作部署如下：',
            '为全面提升企业治理水平，加快推进现代化企业建设步伐，经研究决定，以高质量党建引领高质量发展，全面深化改革创新，持续优化业务布局，特制定如下实施方案：',
            '为切实做好新时期企业改革发展工作，深化企业内部治理机制，按照"强基固本、提质增效"的工作要求，立足新发展阶段，贯彻新发展理念，构建新发展格局，现就有关工作安排如下：',
            '为贯彻落实集团公司战略部署，进一步强化企业管理创新，提升运营效能，根据《关于深化国有企业改革的实施意见》要求，结合公司发展实际，制定本实施方案。'
        ],
        endings: [
            '特此通知。望各单位提高政治站位，强化责任担当，认真贯彻执行，确保各项工作有序推进，为企业高质量发展作出新的更大贡献。各单位落实情况请及时报送公司办公室。',
            '各部门要高度重视，精心组织，周密部署，强化责任落实，确保各项任务落实到位。要建立健全工作机制，加强督查考核，确保工作实效。执行中如遇重要情况，请及时向公司党委报告。',
            '请各相关部门按照文件要求，加强组织领导，细化工作方案，认真组织实施，确保取得实效。要加强协同配合，形成工作合力，推动各项工作落地见效。工作进展情况定期报送改革办。',
            '各单位要结合实际情况，制定具体实施方案，细化工作举措，压实工作责任，确保工作落到实处。要建立常态化督导机制，确保各项任务有序推进。重要事项及时请示报告。',
            '望各部门提高认识，加强领导，狠抓落实，确保工作实效。要坚持问题导向，强化责任担当，创新工作方法，全力推动各项工作取得新突破。工作中的重要问题及时向公司领导汇报。',
            '本方案自发布之日起施行。各部门要严格遵照执行，确保各项举措落实落地。执行过程中如遇重大事项，应及时向公司党委请示汇报。原有相关规定与本方案不一致的，以本方案为准。'
        ]
    };

    // 修改滚动展示函数，添加错误处理
    function setupTemplateScroll(type) {
        const container = document.querySelector(`.${type} .template-content`);
        if (!container) {
            console.error(`找不到容器: .${type} .template-content`);
            return;
        }

        let currentIndex = 0;
        const templates = policyTemplates[type];

        function initScrollItems() {
            try {
                container.innerHTML = templates.map((text, index) => `
                    <div class="scroll-item ${index === 0 ? 'current' : 'next'}" data-index="${index}">
                        ${text}
                    </div>
                `).join('');
            } catch (error) {
                console.error('初始化滚动项时出错:', error);
            }
        }

        function updateTemplate() {
            try {
                const items = container.querySelectorAll('.scroll-item');
                const nextIndex = (currentIndex + 1) % templates.length;

                items.forEach(item => {
                    const index = parseInt(item.dataset.index);
                    if (index === currentIndex) {
                        item.className = 'scroll-item current';
                    } else if (index === nextIndex) {
                        item.className = 'scroll-item next';
                    } else {
                        item.className = 'scroll-item prev';
                    }
                });

                currentIndex = nextIndex;
            } catch (error) {
                console.error('更新模板时出错:', error);
            }
        }

        initScrollItems();
        setInterval(updateTemplate, 6000);
    }

    // 确保DOM加载完成后再启动滚动展示
    setTimeout(() => {
        setupTemplateScroll('openings');
        setupTemplateScroll('endings');
    }, 100);

    // 在DOM加载完成后初始化增强功能
    enhanceTextarea();

    // 图片加载错误处理
    document.querySelectorAll('.slide').forEach(img => {
        img.onerror = function() {
            console.error(`Failed to load image: ${img.src}`);
            // 使用备用图片
            this.src = 'https://source.unsplash.com/random/1920x1080/?government,building';
            // 如果备用图片也失败，则显示背景色
            this.onerror = function() {
                this.style.display = 'none';
                this.parentElement.style.backgroundColor = 'var(--deep-blue)';
            };
        };
    });
});

async function fetchWithRetry(url, options, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response;
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
} 