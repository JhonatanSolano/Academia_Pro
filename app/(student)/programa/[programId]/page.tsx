"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useProgramTree } from "@/lib/hooks/useModules";
import { getCompletions, markContentComplete } from "@/lib/firebase/curriculum";
import { canAccessContent } from "@/types";
import type { Content, ContentCompletion } from "@/types";
import CurriculumSidebar from "@/components/modules/CurriculumSidebar";
import ContentRenderer from "@/components/modules/ContentRenderer";
import Breadcrumbs from "@/components/modules/Breadcrumbs";
import PremiumLock from "@/components/modules/PremiumLock";
import { ContentViewerSkeleton } from "@/components/ui/Skeletons";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProgramViewerPage() {
  const { programId } = useParams<{ programId: string }>();
  const { user } = useAuth();
  const { tree, loading: treeLoading } = useProgramTree(programId ?? null);

  const [activeContent, setActiveContent] = useState<Content | null>(null);
  const [completions, setCompletions] = useState<ContentCompletion[]>([]);
  const [compLoading, setCompLoading] = useState(true);

  /* Fetch completions */
  const loadCompletions = useCallback(async () => {
    if (!user?.uid || !programId) {
      setCompLoading(false);
      return;
    }
    try {
      const data = await getCompletions(user.uid, programId);
      setCompletions(data);
    } catch {
      /* ignore */
    } finally {
      setCompLoading(false);
    }
  }, [user?.uid, programId]);

  useEffect(() => {
    loadCompletions();
  }, [loadCompletions]);

  /* Auto-select first content */
  useEffect(() => {
    if (!tree || activeContent) return;
    const first =
      tree.units[0]?.topics[0]?.contents[0] ?? null;
    if (first) setActiveContent(first);
  }, [tree, activeContent]);

  /* Access check */
  if (!treeLoading && tree && user && !canAccessContent(tree, user)) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>
        <PremiumLock />
      </div>
    );
  }

  /* Loading */
  if (treeLoading || compLoading || !tree) {
    return (
      <div className="flex min-h-screen">
        <div className="hidden w-72 animate-pulse border-r border-white/10 bg-white/[0.02] md:block" />
        <div className="flex-1 px-6 py-8">
          <ContentViewerSkeleton />
        </div>
      </div>
    );
  }

  /* Find breadcrumb context */
  const breadcrumbItems = (() => {
    if (!activeContent) return [{ label: tree.title }];
    for (const unit of tree.units) {
      for (const topic of unit.topics) {
        const found = topic.contents.find(
          (c) => c.id === activeContent.id
        );
        if (found) {
          return [
            { label: tree.title, href: `/programa/${tree.id}` },
            { label: unit.title },
            { label: topic.title },
            { label: found.title },
          ];
        }
      }
    }
    return [{ label: tree.title }];
  })();

  const handleMarkComplete = async () => {
    if (!user?.uid || !activeContent) return;

    const completion: ContentCompletion = {
      contentId: activeContent.id,
      topicId: activeContent.topicId,
      unitId: activeContent.unitId,
      programId: activeContent.programId,
      completedAt: new Date(),
    };
    await markContentComplete(user.uid, completion);
    await loadCompletions();
  };

  const isCompleted = completions.some(
    (c) => c.contentId === activeContent?.id
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <CurriculumSidebar
        tree={tree}
        completions={completions}
        activeContentId={activeContent?.id ?? null}
        onSelectContent={setActiveContent}
      />

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6">
          {activeContent ? (
            <ContentRenderer
              content={activeContent}
              completed={isCompleted}
              onMarkComplete={handleMarkComplete}
            />
          ) : (
            <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500">
              Selecciona un contenido del menú lateral.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
