# Manus route components

[ManusRoutes.tsx](../../appRoutes/ManusRoutes.tsx) mounts Home at `/`, About at `/despre-mine`, B2B at `/cursuri-management-b2b`, Program at `/program-mentorat`, and MentorshipHour at `/ora-de-mentorat`. Each row links to the files that directly use that component.

| Component | Direct consumers |
| --- | --- |
| [Accordion.tsx](ui/Accordion.tsx) | [FAQBlock.tsx](FAQBlock.tsx) |
| [AccordionContent.tsx](ui/AccordionContent.tsx) | [FAQBlock.tsx](FAQBlock.tsx) |
| [AccordionItem.tsx](ui/AccordionItem.tsx) | [FAQBlock.tsx](FAQBlock.tsx) |
| [AccordionTrigger.tsx](ui/AccordionTrigger.tsx) | [FAQBlock.tsx](FAQBlock.tsx) |
| [AmbientPanel.tsx](AmbientPanel.tsx) | [Home.tsx](../../routes/Home.tsx) |
| [BulletBeliefs.tsx](BulletBeliefs.tsx) | [About.tsx](../../routes/About.tsx) |
| [CompactNavList.tsx](CompactNavList.tsx) | No current consumers |
| [Dialog.tsx](ui/Dialog.tsx) | [ManagerQuizOverlay.tsx](../ManagerQuizOverlay.tsx), [BlogReadPage.tsx](../../routes/NormalUser/BlogReadPage.tsx) |
| [DialogClose.tsx](ui/DialogClose.tsx) | No current consumers |
| [DialogContent.tsx](ui/DialogContent.tsx) | [ManagerQuizOverlay.tsx](../ManagerQuizOverlay.tsx), [BlogReadPage.tsx](../../routes/NormalUser/BlogReadPage.tsx) |
| [DialogDescription.tsx](ui/DialogDescription.tsx) | [ManagerQuizOverlay.tsx](../ManagerQuizOverlay.tsx) |
| [DialogFooter.tsx](ui/DialogFooter.tsx) | No current consumers |
| [DialogHeader.tsx](ui/DialogHeader.tsx) | No current consumers |
| [DialogOverlay.tsx](ui/DialogOverlay.tsx) | [DialogContent.tsx](ui/DialogContent.tsx) |
| [DialogPortal.tsx](ui/DialogPortal.tsx) | [DialogContent.tsx](ui/DialogContent.tsx) |
| [DialogTitle.tsx](ui/DialogTitle.tsx) | [ManagerQuizOverlay.tsx](../ManagerQuizOverlay.tsx) |
| [DialogTrigger.tsx](ui/DialogTrigger.tsx) | [BlogReadPage.tsx](../../routes/NormalUser/BlogReadPage.tsx) |
| [Drawer.tsx](ui/Drawer.tsx) | [SiteHeader.tsx](SiteHeader.tsx) |
| [DrawerClose.tsx](ui/DrawerClose.tsx) | [SiteHeader.tsx](SiteHeader.tsx) |
| [DrawerContent.tsx](ui/DrawerContent.tsx) | [SiteHeader.tsx](SiteHeader.tsx) |
| [DrawerDescription.tsx](ui/DrawerDescription.tsx) | No current consumers |
| [DrawerFooter.tsx](ui/DrawerFooter.tsx) | No current consumers |
| [DrawerHeader.tsx](ui/DrawerHeader.tsx) | No current consumers |
| [DrawerOverlay.tsx](ui/DrawerOverlay.tsx) | [DrawerContent.tsx](ui/DrawerContent.tsx) |
| [DrawerPortal.tsx](ui/DrawerPortal.tsx) | [DrawerContent.tsx](ui/DrawerContent.tsx) |
| [DrawerTitle.tsx](ui/DrawerTitle.tsx) | No current consumers |
| [DrawerTrigger.tsx](ui/DrawerTrigger.tsx) | [SiteHeader.tsx](SiteHeader.tsx) |
| [EditorialCard.tsx](EditorialCard.tsx) | [Home.tsx](../../routes/Home.tsx) |
| [FAQBlock.tsx](FAQBlock.tsx) | [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [MentorshipHour.tsx](../../routes/MentorshipHour.tsx), [Program.tsx](../../routes/Program.tsx) |
| [FinalBanner.tsx](FinalBanner.tsx) | [About.tsx](../../routes/About.tsx), [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [MentorshipHour.tsx](../../routes/MentorshipHour.tsx), [Program.tsx](../../routes/Program.tsx) |
| [HeroFrame.tsx](HeroFrame.tsx) | [Home.tsx](../../routes/Home.tsx) |
| [ManagerQuizOverlay.tsx](../ManagerQuizOverlay.tsx) | [PageShell.tsx](PageShell.tsx) |
| [NumberedModuleGrid.tsx](NumberedModuleGrid.tsx) | [B2B.tsx](../../routes/B2B.tsx), [Program.tsx](../../routes/Program.tsx) |
| [PageShell.tsx](PageShell.tsx) | [About.tsx](../../routes/About.tsx), [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [NewLandingPage.tsx](../../routes/LandingPage/new/NewLandingPage.tsx), [MentorshipHour.tsx](../../routes/MentorshipHour.tsx), [Program.tsx](../../routes/Program.tsx) |
| [QuizActionButton.tsx](QuizActionButton.tsx) | [ManagerQuizOverlay.tsx](../ManagerQuizOverlay.tsx) |
| [QuoteBlock.tsx](QuoteBlock.tsx) | [SplitStory.tsx](SplitStory.tsx), [About.tsx](../../routes/About.tsx), [Home.tsx](../../routes/Home.tsx) |
| [Section.tsx](Section.tsx) | [About.tsx](../../routes/About.tsx), [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [MentorshipHour.tsx](../../routes/MentorshipHour.tsx), [Program.tsx](../../routes/Program.tsx) |
| [SectionBadge.tsx](SectionBadge.tsx) | [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [MentorshipHour.tsx](../../routes/MentorshipHour.tsx), [Program.tsx](../../routes/Program.tsx) |
| [SectionIntro.tsx](SectionIntro.tsx) | [About.tsx](../../routes/About.tsx), [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [MentorshipHour.tsx](../../routes/MentorshipHour.tsx), [Program.tsx](../../routes/Program.tsx) |
| [SiteButton.tsx](SiteButton.tsx) | [SiteHeader.tsx](SiteHeader.tsx), [HeroFrame.tsx](HeroFrame.tsx), [FinalBanner.tsx](FinalBanner.tsx), [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [MentorshipHour.tsx](../../routes/MentorshipHour.tsx), [Program.tsx](../../routes/Program.tsx) |
| [SiteFooter.tsx](SiteFooter.tsx) | [PageShell.tsx](PageShell.tsx) |
| [SiteHeader.tsx](SiteHeader.tsx) | [PageShell.tsx](PageShell.tsx) |
| [SiteLink.tsx](SiteLink.tsx) | [SiteHeader.tsx](SiteHeader.tsx), [SiteFooter.tsx](SiteFooter.tsx), [EditorialCard.tsx](EditorialCard.tsx), [CompactNavList.tsx](CompactNavList.tsx) |
| [SplitStory.tsx](SplitStory.tsx) | [About.tsx](../../routes/About.tsx) |
| [StepCards.tsx](StepCards.tsx) | [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [MentorshipHour.tsx](../../routes/MentorshipHour.tsx), [Program.tsx](../../routes/Program.tsx) |
| [TestimonialGrid.tsx](TestimonialGrid.tsx) | [B2B.tsx](../../routes/B2B.tsx), [Home.tsx](../../routes/Home.tsx), [Program.tsx](../../routes/Program.tsx) |
