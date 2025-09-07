import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TagTest() {
    const [projects, setProjects] = useState<unknown[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const createTestProject = async (tags: string[]) => {
        setIsLoading(true);
        try {
            const testProject = {
                title: `Test Project - ${tags.join(', ')}`,
                description: 'This is a test project to verify tag functionality',
                tags: tags,
                featured: tags.includes('Featured'),
                tech_stack: ['React', 'TypeScript'],
            };

            console.log('Creating project with data:', testProject);

            const { data, error } = await supabase
                .from('projects')
                .insert(testProject)
                .select()
                .single();

            if (error) {
                console.error('Error creating project:', error);
                throw error;
            }

            console.log('Project created successfully:', data);
            await fetchProjects();
        } catch (error) {
            console.error('Failed to create test project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateProjectTags = async (projectId: string, newTags: string[]) => {
        setIsLoading(true);
        try {
            const updateData = {
                tags: newTags,
                featured: newTags.includes('Featured'),
            };

            console.log('Updating project with data:', updateData);

            const { data, error } = await supabase
                .from('projects')
                .update(updateData)
                .eq('id', projectId)
                .select()
                .single();

            if (error) {
                console.error('Error updating project:', error);
                throw error;
            }

            console.log('Project updated successfully:', data);
            await fetchProjects();
        } catch (error) {
            console.error('Failed to update project:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            console.log('Fetched projects:', data);
            setProjects(data || []);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const clearTestProjects = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .like('title', 'Test Project%');

            if (error) throw error;

            console.log('Test projects cleared');
            await fetchProjects();
        } catch (error) {
            console.error('Failed to clear test projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Tag Functionality Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() => createTestProject(['Frontend'])}
                        disabled={isLoading}
                    >
                        Create Frontend Project
                    </Button>
                    <Button
                        onClick={() => createTestProject(['Featured'])}
                        disabled={isLoading}
                    >
                        Create Featured Project
                    </Button>
                    <Button
                        onClick={() => createTestProject(['Fullstack'])}
                        disabled={isLoading}
                    >
                        Create Fullstack Project
                    </Button>
                    <Button
                        onClick={() => createTestProject(['Frontend', 'Featured'])}
                        disabled={isLoading}
                    >
                        Create Frontend + Featured
                    </Button>
                    <Button
                        onClick={fetchProjects}
                        disabled={isLoading}
                        variant="outline"
                    >
                        Refresh Projects
                    </Button>
                    <Button
                        onClick={clearTestProjects}
                        disabled={isLoading}
                        variant="destructive"
                    >
                        Clear Test Projects
                    </Button>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Projects in Database:</h3>
                    {projects.length === 0 ? (
                        <p className="text-muted-foreground">No projects found</p>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="p-3 border rounded-lg">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{project.title}</h4>
                                    <div className="flex items-center gap-2">
                                        {project.featured && (
                                            <Badge variant="default">Featured (DB)</Badge>
                                        )}
                                        {project.tags?.map((tag: string, index: number) => (
                                            <Badge key={index} variant="outline">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Featured field: {project.featured ? 'true' : 'false'} |
                                    Tags: [{project.tags?.join(', ') || 'none'}]
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateProjectTags(project.id, ['Frontend'])}
                                        disabled={isLoading}
                                    >
                                        Set Frontend
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateProjectTags(project.id, ['Featured'])}
                                        disabled={isLoading}
                                    >
                                        Set Featured
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateProjectTags(project.id, ['Fullstack'])}
                                        disabled={isLoading}
                                    >
                                        Set Fullstack
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateProjectTags(project.id, ['Frontend', 'Featured'])}
                                        disabled={isLoading}
                                    >
                                        Set Both
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}