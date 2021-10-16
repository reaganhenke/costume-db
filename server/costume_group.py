class CostumeGroup:
    def __init__(self, name, description, image_url, origin, fandom_url):
        self.name = name
        self.members = []
        self.description = description
        self.image_url = image_url
        self.origin = origin
        self.fandom_url = fandom_url

    def group_size(self):
        return len(self.members)

    def add_member(self, individual):
        self.members.append(individual)

    def __str__(self):
        string = f"({self.name}: "
        for member in self.members:
            string += str(member)
            string += ', '

        return string[:-2] + ')'

    def __repr__(self):
        return self.__str__()
        