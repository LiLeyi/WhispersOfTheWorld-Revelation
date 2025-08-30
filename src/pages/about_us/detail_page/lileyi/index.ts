import "./index.css"

document.addEventListener('DOMContentLoaded', function () {
    // 项目数据
    const projects = [
        {
            title: "笔记",
            description: "上课的笔记",
            link: "https://github.com/LiLeyi/Notes"
        },
        {
            title: "游戏插件",
            description: "玩我的世界玩的",
            link: "https://github.com/DEC-Development/DecBE"
        },
        {
            title: "随机和弦生成",
            description: "学乐理学的",
            link: "https://github.com/LiLeyi/RandomChordGenerate"
        },
        {
            title: "多人五子棋",
            description: "为了解决只有两个人能玩五子棋的问题",
            link: "https://github.com/LiLeyi/MChessSource"
        }
    ];

    // 个人介绍数据
    const introContents = [
        {
            title: "乐子人",
            content: "你是乐子还是我是乐子还是我们都是乐子。"
        },
        {
            title: "严肃的程序猿",
            content: "死都不想写前端，一个劲造逻辑，ts用的飞起，加上webpack开始疯狂循环引用。"
        },
        {
            title: "放松的程序员",
            content: "冲冲冲Python，类型是什么效率是什么？我不知道。"
        },
        {
            title: "臭搞音乐的",
            content: "什么都沾一点但什么都不太会，小众爱好一扒拉，想搞jazz但没那技术。"
        },
        {
            title: "兴趣爱好",
            content: "业余时间喜欢研究新技术，阅读技术博客，也喜欢摄影（没钱买相机只有手机qwq）和旅行，通过不同的视角观察世界。"
        },
        {
            title: "好看的",
            content: "<a href='https://www.bilibili.com/video/BV1GJ411x7h7'>点我看好看的东西</a>"
        }
    ];

    // 技能数据
    const skills = [
        "JavaScript",
        "TypeScript",
        "MySQL",
        "Python",
        "Electron",
        "Node.js",
        "Webpack",
        "CSS3",
        "HTML5",
        "Git",
        "C",
        "C++"
    ];

    // 引言数据
    const quotes = [
        {
            text: "Code is like humor. When you have to explain it, it's bad.",
            author: "Cory House"
        },
        {
            text: "Programs must be written for people to read, and only incidentally for machines to execute.",
            author: "Harold Abelson"
        },
        {
            text: "Simplicity is prerequisite for reliability.",
            author: "Edsger W. Dijkstra"
        },
        {
            text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            author: "Martin Fowler"
        },
        {
            text: "The best code is no code at all.",
            author: "Jeff Atwood"
        },
        {
            text: "First, solve the problem. Then, write the code.",
            author: "John Johnson"
        },
        {
            text: "Experience is the name everyone gives to their mistakes.",
            author: "Oscar Wilde"
        },
        {
            text: "In order to be irreplaceable, one must always be different.",
            author: "Coco Chanel"
        },
        {
            text: "Java is to JavaScript what car is to Carpet.",
            author: "Chris Heilmann"
        },
        {
            text: "Knowledge is power.",
            author: "Francis Bacon"
        },
        {
            text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
            author: "Dan Salomon"
        },
        {
            text: "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.",
            author: "Antoine de Saint-Exupery"
        },
        {
            text: "Ruby is rubbish! PHP is phpantastic!",
            author: "Nikita Popov"
        },
        {
            text: "Code never lies, comments sometimes do.",
            author: "Ron Jeffries"
        },
        {
            text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
            author: "Edsger W. Dijkstra"
        },
        {
            text: "The most damaging phrase in the language is.. it's always been done this way.",
            author: "Grace Hopper"
        },
        {
            text: "Optimism is an occupational hazard of programming; feedback is the treatment.",
            author: "Kent Beck"
        },
        {
            text: "When to use iterative development? You should use iterative development only on projects that you want to succeed.",
            author: "Martin Fowler"
        },
        {
            text: "Before software can be reusable it first has to be usable.",
            author: "Ralph Johnson"
        },
        {
            text: "Make it work, make it right, make it fast.",
            author: "Kent Beck"
        }
    ];

    // 联系方式数据 - 独立的联系方式项
    const contactItems = [
        {
            title: "📧 邮箱",
            content: "876485160@qq.com"
        },
        {
            title: "📧 邮箱",
            content: "l876485160@gmail.com"
        },
        {
            title: "🌐 社交媒体",
            content: "Github: LiLeyi"
        },
        {
            title: "🌐 社交媒体",
            content: "Twitter: @le_lyii"
        },
        {
            title: "🌐 社交媒体",
            content: "Bilibili: DEC-LiLeyi"
        },
        {
            title: "🐧 社交媒体",
            content: "QQ: 1015849214"
        },
        {
            title: "🏠 地址",
            content: "房山理工大专"
        }
    ];

    // 随机选择项目的函数
    function getRandomProject() {
        const randomIndex = Math.floor(Math.random() * projects.length);
        return projects[randomIndex];
    }

    // 随机选择头像的函数
    function getRandomIcon() {
        // 定义头像文件数组
        const icons = [
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_1.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_10.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_11.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_12.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_13.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_14.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_15.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_2.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_3.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_4.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_5.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_6.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_7.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_8.PNG',
            '../../../../assets/images/about_us/detail/lileyi/icons/icon_9.PNG',
        ];


        // 随机选择一个头像
        const randomIndex = Math.floor(Math.random() * icons.length);
        return icons[randomIndex];
    }

    // 获取随机个人介绍
    function getRandomIntro() {
        const randomIndex = Math.floor(Math.random() * introContents.length);
        return introContents[randomIndex];
    }

    // 获取随机技能
    function getRandomSkills() {
        // 随机选择5个技能
        const shuffled = [...skills].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    }

    // 获取随机引言
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }

    // 获取两个随机联系方式
    function getRandomContacts() {
        // 创建一个联系方式数组的副本并打乱
        const shuffled = [...contactItems].sort(() => 0.5 - Math.random());
        // 返回前两个
        return shuffled.slice(0, 2);
    }

    // 设置随机头像的函数（无动画效果）
    function setRandomIcon() {
        const profileImg = <HTMLImageElement>document.getElementById('profileImg');
        const randomIcon = getRandomIcon();

        // 直接更换图片，无动画
        profileImg.src = randomIcon;
    }

    // 设置随机个人介绍
    function setRandomIntro() {
        const intro = getRandomIntro();
        const introContent = document.querySelector('.intro-content');

        // 更新个人介绍内容
        introContent!.innerHTML = `
            <h3>${intro.title}</h3>
            <p>${intro.content}</p>
        `;
    }

    // 设置随机技能
    function setRandomSkills() {
        const skillsList = getRandomSkills();
        const skillsContainer = document.querySelector('.skills-container');

        if (skillsContainer) {
            skillsContainer.innerHTML = skillsList.map(skill =>
                `<div class="skill-item">${skill}</div>`
            ).join('');
        }
    }

    // 设置随机引言
    function setRandomQuote() {
        const quote = getRandomQuote();
        const quoteContent = document.querySelector('.quote-content');
        const quoteAuthor = document.querySelector('.quote-author');

        if (quoteContent) {
            quoteContent.textContent = quote.text;
        }

        if (quoteAuthor) {
            quoteAuthor.textContent = `- ${quote.author}`;
        }
    }

    // 设置随机联系方式
    function setRandomContact() {
        const contacts = getRandomContacts();
        const contactItemsElements = document.querySelectorAll('.contact-item');

        // 更新每个联系方式项
        contactItemsElements.forEach((item, index) => {
            const titleElement = item.querySelector('h3');
            const contentElement = item.querySelector('p');

            if (titleElement && contentElement && contacts[index]) {
                titleElement.textContent = contacts[index].title;
                contentElement.textContent = contacts[index].content;
            }
        });
    }

    // 设置随机项目
    function setRandomProject() {
        const project = getRandomProject();
        const projectCard = document.getElementById('projectCard');

        if (!projectCard) return;
        // 更新项目内容
        projectCard.querySelector('.project-title')!.textContent = project.title;
        projectCard.querySelector('p')!.textContent = project.description;

        // 更新项目链接
        const projectLink = <HTMLLinkElement>projectCard!.querySelector('.project-link');
        projectLink.href = project.link;
    }

    // 创建Intersection Observer来检测头像是否在视口内
    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // 当头像滑出视口时，随机切换头像
                setRandomIcon();
            }
        });
    }, {
        threshold: 0 // 当元素完全离开视口时触发
    });

    // 创建Intersection Observer来检测个人介绍是否在视口内
    const introObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // 当个人介绍滑出视口时，随机切换内容
                setRandomIntro();
            }
        });
    }, {
        threshold: 0 // 当元素完全离开视口时触发
    });

    // 创建Intersection Observer来检测技能区域是否在视口内
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // 当技能区域滑出视口时，随机切换内容
                setRandomSkills();
            }
        });
    }, {
        threshold: 0 // 当元素完全离开视口时触发
    });

    // 创建Intersection Observer来检测引言区域是否在视口内
    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // 当引言区域滑出视口时，随机切换内容
                setRandomQuote();
            }
        });
    }, {
        threshold: 0 // 当元素完全离开视口时触发
    });

    // 创建Intersection Observer来检测项目是否在视口内
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // 当项目滑出视口时，随机切换项目
                setRandomProject();
            }
        });
    }, {
        threshold: 0 // 当元素完全离开视口时触发
    });

    // 创建Intersection Observer来检测联系方式是否在视口内
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // 当联系方式滑出视口时，随机切换内容
                setRandomContact();
            }
        });
    }, {
        threshold: 0 // 当元素完全离开视口时触发
    });

    // 观察头像元素
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        iconObserver.observe(profileImg);
    }

    // 观察个人介绍元素
    const introSection = document.querySelector('.intro-content');
    if (introSection) {
        introObserver.observe(introSection);
    }

    // 观察技能区域
    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // 观察引言区域
    const quoteSection = document.querySelector('.quote-content');
    if (quoteSection) {
        quoteObserver.observe(quoteSection);
    }

    // 观察项目元素
    const projectContainer = document.getElementById('projectContainer');
    if (projectContainer) {
        projectObserver.observe(projectContainer);
    }

    // 观察联系方式元素
    const contactSection = document.querySelector('.contact-info');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // 页面加载时设置随机头像、个人介绍、技能、引言、联系方式和项目
    setRandomIcon();
    setRandomIntro();
    setRandomSkills();
    setRandomQuote();
    setRandomContact();
    setRandomProject();
});