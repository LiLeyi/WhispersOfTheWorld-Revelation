import './music_library.css';
import { AudioManager } from '../../components/AudioManager';

type TrackType = 'bgm' | 'se';

interface TrackItemData {
    src: string; // 文件名或完整URL
    title: string;
    artist: string;
    type: TrackType;
}

/**
 * 解析 DOM 中的曲目列表数据
 */
function collectTracksFromList(listEl: HTMLElement): TrackItemData[] {
    const items = Array.from(listEl.querySelectorAll<HTMLElement>('.track-item'));
    return items.map((el) => ({
        src: el.dataset.src || '',
        title: el.dataset.title || '未知曲目',
        artist: el.dataset.artist || '未知',
        type: (el.dataset.type as TrackType) || 'bgm',
    }));
}

/**
 * 将秒数格式化为 mm:ss
 */
function formatTime(seconds: number): string {
    if (!isFinite(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const audioManager = AudioManager.getInstance();

    // 本页面使用纯色/渐变背景，不再加载图片背景。保留容器以兼容旧样式（已在 CSS 中隐藏）。

    // 绑定元素
    const listEl = document.getElementById('trackList') as HTMLElement;
    const trackTitle = document.getElementById('trackTitle') as HTMLElement;
    const trackArtist = document.getElementById('trackArtist') as HTMLElement;
    const currentTimeEl = document.getElementById('currentTime') as HTMLElement;
    const durationEl = document.getElementById('duration') as HTMLElement;
    const playPauseBtn = document.getElementById('playPauseBtn') as HTMLButtonElement;
    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    const seekBar = document.getElementById('seekBar') as HTMLInputElement;
    const volumeBar = document.getElementById('volumeBar') as HTMLInputElement;
    const backButton = document.getElementById('backButton') as HTMLButtonElement;

    // 准备数据源
    const allTracks: TrackItemData[] = collectTracksFromList(listEl);
    let filteredTracks: TrackItemData[] = [...allTracks];
    let currentIndex = -1;

    // 单击列表项播放
    function renderListActiveState(): void {
        const items = Array.from(listEl.querySelectorAll<HTMLElement>('.track-item'));
        items.forEach((el, idx) => {
            el.classList.toggle('active', idx === currentIndex);
            // 将可见的文本填充（避免在 HTML 中重复写）
            const data = filteredTracks[idx];
            if (data) {
                el.innerHTML = `<div>♪</div><div>${data.title} — <span style="opacity:.8">${data.artist}</span></div><div>${data.type.toUpperCase()}</div>`;
            }
        });
    }

    function updateMetaDisplay(track: TrackItemData, durationSec?: number): void {
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        if (typeof durationSec === 'number') {
            durationEl.textContent = formatTime(durationSec);
        }
    }

    function playIndex(index: number): void {
        if (index < 0 || index >= filteredTracks.length) return;
        currentIndex = index;
        const track = filteredTracks[currentIndex];

        // 将此曲目设为当前 BGM（或音效也可试听）
        audioManager.updateBackgroundMusic(track.src);
        updateMetaDisplay(track);
        renderListActiveState();

        // 切换按钮图标
        playPauseBtn.textContent = '⏸';
    }

    function playNext(): void {
        if (filteredTracks.length === 0) return;
        const next = currentIndex + 1 >= filteredTracks.length ? 0 : currentIndex + 1;
        playIndex(next);
    }

    function playPrev(): void {
        if (filteredTracks.length === 0) return;
        const prev = currentIndex - 1 < 0 ? filteredTracks.length - 1 : currentIndex - 1;
        playIndex(prev);
    }

    // 进度与时长显示：使用全局 #music 元素监听
    const musicEl = document.getElementById('music') as HTMLAudioElement | null;
    if (musicEl) {
        musicEl.addEventListener('timeupdate', () => {
            const cur = musicEl.currentTime || 0;
            const dur = musicEl.duration || 0;
            currentTimeEl.textContent = formatTime(cur);
            durationEl.textContent = isFinite(dur) ? formatTime(dur) : '00:00';
            // 更新滑条（0-100）
            if (isFinite(dur) && dur > 0) {
                seekBar.value = String(Math.floor((cur / dur) * 100));
            }
        });
        musicEl.addEventListener('loadedmetadata', () => {
            const dur = musicEl.duration || 0;
            durationEl.textContent = isFinite(dur) ? formatTime(dur) : '00:00';
        });
        musicEl.addEventListener('ended', () => {
            playNext();
        });
    }

    // 播放/暂停
    playPauseBtn.addEventListener('click', () => {
        if (!musicEl) return;
        if (musicEl.paused) {
            musicEl.play().catch(() => {});
            playPauseBtn.textContent = '⏸';
        } else {
            musicEl.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    // 上一首 / 下一首
    prevBtn.addEventListener('click', playPrev);
    nextBtn.addEventListener('click', playNext);

    // 拖动进度
    seekBar.addEventListener('input', () => {
        if (!musicEl) return;
        const ratio = parseInt(seekBar.value, 10) / 100;
        if (isFinite(musicEl.duration)) {
            musicEl.currentTime = ratio * musicEl.duration;
        }
    });

    // 音量控制：同步到 AudioManager 的 BGM 音量
    // 注意：设置项页面会覆盖 localStorage；此处仅即时调整播放音量
    volumeBar.addEventListener('input', () => {
        const vol = parseInt(volumeBar.value, 10) / 100;
        audioManager.setBGMVolume(vol);
    });

    // 列表点击
    listEl.addEventListener('click', (e) => {
        const li = (e.target as HTMLElement).closest('.track-item') as HTMLElement | null;
        if (!li) return;
        const index = Array.from(listEl.querySelectorAll('.track-item')).indexOf(li);
        if (index >= 0) playIndex(index);
    });

    // 过滤与搜索
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const suggestions = document.getElementById('suggestions') as HTMLUListElement;
    const filterBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('.filter-btn'));
    function renderListFromFiltered(): void {
        // 清空现有 li，用过滤后的数据重建，避免索引错位
        listEl.innerHTML = '';
        filteredTracks.forEach((data, idx) => {
            const li = document.createElement('li');
            li.className = 'track-item' + (idx === currentIndex ? ' active' : '');
            li.dataset.src = data.src;
            li.dataset.title = data.title;
            li.dataset.artist = data.artist;
            li.dataset.type = data.type;
            li.innerHTML = `<div>♪</div><div>${data.title} — <span style="opacity:.8">${data.artist}</span></div><div>${data.type.toUpperCase()}</div>`;
            listEl.appendChild(li);
        });
    }

    function applyFilter(): void {
        const keywordRaw = searchInput.value || '';
        const keyword = keywordRaw.trim().toLowerCase();
        const activeType = (filterBtns.find(b => b.classList.contains('active'))?.dataset.filter || 'all') as 'all' | TrackType;

        // 仅按 data-title（即 title）筛选；逻辑：包含/相等/部分一致 => 实质上都是包含匹配
        filteredTracks = allTracks.filter(t => {
            const title = t.title.toLowerCase();
            const matchTitle = keyword === '' ? true : title.includes(keyword);
            const matchType = activeType === 'all' ? true : t.type === activeType;
            return matchTitle && matchType;
        });

        // 重建列表，避免旧 DOM 残留导致索引错误
        renderListFromFiltered();
        if (currentIndex >= filteredTracks.length) currentIndex = -1;
        updateSuggestions();
    }

    // 智能联想：根据当前输入，对 title 做前缀+包含排序推荐
    function updateSuggestions(): void {
        const keyword = (searchInput.value || '').trim().toLowerCase();
        if (!keyword) {
            suggestions.classList.remove('show');
            suggestions.innerHTML = '';
            return;
        }

        const candidates = allTracks
            .map(t => t.title)
            .filter((title, index, self) => self.indexOf(title) === index); // 去重

        const startsWith: string[] = [];
        const includes: string[] = [];
        for (const title of candidates) {
            const low = title.toLowerCase();
            if (low.startsWith(keyword)) startsWith.push(title);
            else if (low.includes(keyword)) includes.push(title);
        }
        const results = [...startsWith, ...includes].slice(0, 8);

        if (results.length === 0) {
            suggestions.classList.remove('show');
            suggestions.innerHTML = '';
            return;
        }

        suggestions.innerHTML = results
            .map(t => `<li>${t.replace(new RegExp(`(${keyword})`, 'ig'), '<b>$1</b>')}</li>`)
            .join('');
        suggestions.classList.add('show');
    }

    // 输入节流/防抖
    let debounceTimer: number | undefined;
    function onSearchInput(): void {
        if (debounceTimer) window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(() => applyFilter(), 120);
    }
    searchInput.addEventListener('input', onSearchInput);

    // 建议点击/键盘操作
    suggestions.addEventListener('click', (e) => {
        const li = (e.target as HTMLElement).closest('li');
        if (!li) return;
        searchInput.value = li.textContent || '';
        suggestions.classList.remove('show');
        applyFilter();
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            suggestions.classList.remove('show');
            return;
        }
        if (e.key === 'Enter') {
            suggestions.classList.remove('show');
            applyFilter();
            return;
        }
        // 上下键选择建议项
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const items = Array.from(suggestions.querySelectorAll('li')) as HTMLLIElement[];
            if (items.length === 0) return;
            let idx = items.findIndex(li => li.classList.contains('active'));
            if (e.key === 'ArrowDown') idx = (idx + 1) % items.length;
            if (e.key === 'ArrowUp') idx = (idx - 1 + items.length) % items.length;
            items.forEach(li => li.classList.remove('active'));
            items[idx].classList.add('active');
            e.preventDefault();
        }
    });

    // 点击非搜索区域时隐藏建议
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.search-wrap')) {
            suggestions.classList.remove('show');
        }
    });
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter();
        });
    });

    // 返回按钮
    backButton.addEventListener('click', () => {
        window.location.href = '../main_menu/main_menu.html';
    });

    // 初始渲染与默认选择
    renderListActiveState();
    if (filteredTracks.length > 0) {
        playIndex(0);
    }
});


