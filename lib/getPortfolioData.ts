// app/lib/getPortfolioData.tsx
export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    link: string;
    details: string;
    metrics: Record<string, any>;
    deliverables: string[];
}

export interface HeroData {
    id: string;
    greeting: string;
    name: string;
    title: string;
    description: string;
    phone?: string;
    email?: string;
    address?: string;
    resume_url?: string;
    profile_image: string;
    skills?: string[]; // <-- dynamic skills from API
    social_links?: {
        instagram?: string;
        linkedin?: string;
        facebook?: string;
        youtube?: string;
    };
    my_story?: string ;
    marketing_philosophy?: string;
    marketing_approach?: { step: string; title: string; desc: string }[];
    unique_traits?: { icon: string; title: string; desc: string }[];
}

export interface EducationEntry {
    id: string;
    degree: string;
    school: string;
    start_year: string;
    end_year: string;
    year: string;
    honors: string[];
}

export interface ExperienceEntry {
    id: string;
    role: string;
    company: string;
    start_date: string; // ISO string from DB
    end_date: string | null; // null if currently_working
    currently_working: boolean;
    description: string;
    highlights: string[];
    platform_tools: string[];
    period?: string;       // added dynamically
    platforms?: string;    // added dynamically
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    deliverables: string[];
}

export interface Skill {
    name: string;
    level: number;
    category?: string; // optional for soft skills
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface BlogPosts{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    cover_image: string;
    published: boolean;
    published_at: string;
}

export interface PortfolioData {
    hero: HeroData;
    education: EducationEntry[];
    experience: ExperienceEntry[];
    projects: Project[];
    services: Service[];
    skills: Skill[];
    testimonials: Testimonial[];
    blogPosts: BlogPosts[];
}

// getPortfolioData.ts (client fetch)
export async function getPortfolioData(): Promise<PortfolioData> {
    const endpoints = [
        "/api/hero",
        "/api/education",
        "/api/experience",
        "/api/project",
        "/api/service",
        "/api/skilltool",
        "/api/testimonial",
        "/api/blog"
    ];

    const responses = await Promise.all(
        endpoints.map((url) =>
            fetch(url).catch((err) => {
                console.error(`Fetch failed for ${url}`, err);
                return null;
            })
        )
    );

    const jsons = await Promise.all(
        responses.map(async (res, i) => {
            if (!res || !res.ok) {
                console.error(`Bad response for ${endpoints[i]}:`, res?.status, res?.statusText);
                return { data: [] }; // fallback so .data exists
            }
            try {
                return await res.json();
            } catch (err) {
                console.error(`JSON parse error for ${endpoints[i]}:`, err);
                return { data: [] }; // fallback
            }
        })
    );

    const rawSkills: { category: string; items: Skill[] }[] = jsons[5]?.data ?? [];

    const techSkills: Record<string, Skill[]> = {};
    const softSkills: Skill[] = [];

    rawSkills.forEach((row) => {
        if (row.category.toLowerCase() === "soft skills") {
            softSkills.push(...row.items);
        } else {
            techSkills[row.category] = row.items;
        }
    });

    // Optionally, you can flatten all skills if your Skills component expects one array:
    const allSkills: Skill[] = rawSkills.flatMap(row =>
        row.items.map(item => ({ ...item, category: row.category }))
    );
    return {
        hero: jsons[0]?.data ?? {},
        education: jsons[1]?.data ?? [],
        experience: jsons[2]?.data ?? [],
        projects: jsons[3]?.data ?? [],
        services: jsons[4]?.data ?? [],
        skills: allSkills,
        testimonials: jsons[6]?.data ?? [],
        blogPosts: jsons[7]?.data ?? []
    };
}